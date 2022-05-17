import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { Network, poolSymbol, providerish, signerish } from "./types";
import { offsetHelperABI, poolTokenABI } from "./utils/ABIs";
import addresses, { IfcOneNetworksAddresses } from "./utils/addresses";

class OffsetHelperClient {
  provider: providerish;
  signer: signerish;
  walletAddress: string;
  network: Network;
  addresses: IfcOneNetworksAddresses;
  offsetHelper: ethers.Contract;
  bct: ethers.Contract;
  nct: ethers.Contract;

  constructor(
    network: Network,
    walletAddress: string,
    provider: providerish,
    signer: signerish
  ) {
    this.network = network;
    this.walletAddress = walletAddress;
    this.provider = provider;
    this.signer = signer;

    this.addresses =
      this.network == "polygon" ? addresses.polygon : addresses.mumbai;

    this.offsetHelper = new ethers.Contract(
      this.addresses.offsetHelper,
      offsetHelperABI,
      this.signer
    );
    this.bct = new ethers.Contract(
      this.addresses.bct,
      poolTokenABI,
      this.signer
    );
    this.nct = new ethers.Contract(
      this.addresses.nct,
      poolTokenABI,
      this.signer
    );
  }

  /**
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   */
  autoOffset = async (
    poolSymbol: poolSymbol,
    amount: string
  ): Promise<ethers.ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const approveTxn: ethers.ContractTransaction = await poolToken.approve(
      this.addresses.offsetHelper,
      parseEther(amount)
    );
    await approveTxn.wait();

    const offsetTxn: ethers.ContractTransaction =
      await this.offsetHelper.autoOffsetUsingPoolToken(
        this.addresses.nct,
        parseEther(amount),
        { gasLimit: 2500000 }
      );
    return await offsetTxn.wait();
  };
}

export default OffsetHelperClient;
