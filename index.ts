import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { allowedNetworks, providerish, signerish } from "./types";
import addresses, { IfcOneNetworksAddresses } from "./utils/addresses";
import networkIds from "./utils/networkIds";

const poolAbi = [
  "function approve(address _poolToken, uint256 _amountToOffset)",
];

const offseterAbi = [
  "function autoOffsetUsingPoolToken(address spender, uint256 amount)",
];

class OffsetHelperClient {
  provider: providerish;
  signer: signerish;
  walletAddress: string;
  network: allowedNetworks;
  addresses: IfcOneNetworksAddresses;

  constructor(
    network: allowedNetworks,
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
  }

  /**
   * @notice you need to connect wallet or rpc first
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   */
  autoOffset = async (
    poolSymbol: string,
    amount: string
  ): Promise<ethers.ContractReceipt> => {
    const poolTokenAddress =
      poolSymbol == "BCT" ? this.addresses.bct : this.addresses.nct;

    // approve OffsetHelper from pool token
    const poolToken = new ethers.Contract(
      poolTokenAddress,
      poolAbi,
      this.signer
    );

    const approveTxn: ethers.ContractTransaction = await poolToken.approve(
      this.addresses.offsetHelper,
      parseEther(amount)
    );

    // wait for approval receipt
    await approveTxn.wait();

    const offsetHelper = new ethers.Contract(
      this.addresses.offsetHelper,
      offseterAbi,
      this.signer
    );
    const offsetTxn: ethers.ContractTransaction =
      await offsetHelper.autoOffsetUsingPoolToken(
        this.addresses.nct,
        parseEther(amount)
      );

    // wait for offset receipt
    return await offsetTxn.wait();
  };
}

export default OffsetHelperClient;
