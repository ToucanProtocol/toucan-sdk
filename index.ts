import { Contract, ContractReceipt, ContractTransaction, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { IToucanPoolToken, OffsetHelper } from "./typechain";
import { Network, poolSymbol, providerish, signerish } from "./types";
import { offsetHelperABI, poolTokenABI } from "./utils/ABIs";
import addresses, { IfcOneNetworksAddresses } from "./utils/addresses";

class OffsetHelperClient {
  provider: providerish;
  signer: signerish;
  walletAddress: string;
  network: Network;
  addresses: IfcOneNetworksAddresses;
  offsetHelper: OffsetHelper;
  bct: IToucanPoolToken;
  nct: IToucanPoolToken;

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

    // @ts-ignore
    this.offsetHelper = new ethers.Contract(
      this.addresses.offsetHelper,
      offsetHelperABI,
      this.signer
    );
    // @ts-ignore
    this.bct = new ethers.Contract(
      this.addresses.bct,
      poolTokenABI,
      this.signer
    );
    // @ts-ignore
    this.nct = new ethers.Contract(
      this.addresses.nct,
      poolTokenABI,
      this.signer
    );
  }

  /**
   * @description allows user to retire carbon using carbon pool tokens from his wallet
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   */
  autoOffsetUsingPoolToken = async (
    poolSymbol: poolSymbol,
    amount: string
  ): Promise<ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const approveTxn: ContractTransaction = await poolToken.approve(
      this.addresses.offsetHelper,
      parseEther(amount)
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingPoolToken(
        this.addresses.nct,
        parseEther(amount),
        { gasLimit: 2500000 }
      );
    return await offsetTxn.wait();
  };

  /**
   * @description swaps given token for carbon pool tokens and uses them to retire carbon
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   */
  autoOffsetUsingSwapToken = async (
    poolSymbol: poolSymbol,
    amount: string,
    swapToken: Contract
  ): Promise<ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const approveTxn: ContractTransaction = await swapToken.approve(
      this.addresses.offsetHelper,
      await this.offsetHelper.calculateNeededTokenAmount(
        swapToken.address,
        poolToken.address,
        parseEther(amount)
      )
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingToken(
        swapToken.address,
        poolToken.address,
        parseEther(amount),
        { gasLimit: 2500000 }
      );
    return await offsetTxn.wait();
  };

  /**
   * @description swaps ETH for carbon pool tokens and uses them to retire carbon
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   */
  autoOffsetUsingETH = async (
    poolSymbol: poolSymbol,
    amount: string
  ): Promise<ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingETH(
        poolToken.address,
        parseEther(amount),
        {
          gasLimit: 2500000,
          value: await this.offsetHelper.calculateNeededETHAmount(
            poolToken.address,
            parseEther(amount)
          ),
        }
      );
    return await offsetTxn.wait();
  };

  calculateNeededTokenAmount = async (
    poolSymbol: poolSymbol,
    amount: string,
    swapToken: Contract
  ) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await this.offsetHelper.calculateNeededTokenAmount(
      swapToken.address,
      poolToken.address,
      parseEther(amount)
    );
  };

  calculateNeededETHAmount = async (poolSymbol: poolSymbol, amount: string) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await this.offsetHelper.calculateNeededETHAmount(
      poolToken.address,
      parseEther(amount)
    );
  };
}

export default OffsetHelperClient;
