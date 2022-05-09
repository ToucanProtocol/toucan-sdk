import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import addresses from "./utils/addresses";
import networkIds from "./utils/networkIds";

const poolAbi = [
  "function approve(address _poolToken, uint256 _amountToOffset)",
];

const offseterAbi = [
  "function autoOffsetUsingPoolToken(address spender, uint256 amount)",
];

class OffsetHelperClient {
  provider:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcProvider
    | undefined;
  signer: ethers.providers.Provider | ethers.Signer | undefined;
  walletAddress: string | undefined;

  constructor() {}

  /**
   * @notice to be used on the backend
   * @param privateKey the key of the wallet to use when signing transactions
   * @param rpcUrl the rpc url you want to use for the provider (can be an Infura or Alchemy url)
   */
  connectRpc = (
    walletAddress?: string,
    privateKey?: string,
    rpcUrl?: string
  ): void => {
    this.provider = new ethers.providers.StaticJsonRpcProvider(
      rpcUrl || process.env.NODE_API_RPC_URL || ""
    );
    this.signer = privateKey
      ? new ethers.Wallet(privateKey, this.provider)
      : this.provider.getSigner();
    this.walletAddress = walletAddress;
  };

  /**
   * @notice to be used in the browser
   * @param network the network you want to connect the user to ("polygon" or "mumbai")
   */
  connectWallet = async (network: "polygon" | "mumbai"): Promise<void> => {
    // check wallet (e.g.: Metamask)
    // @ts-ignore
    const { ethereum } = window;
    if (!ethereum) {
      throw new Error("You need a wallet.");
    }

    // set the provider and signer
    this.provider = new ethers.providers.Web3Provider(ethereum);
    this.signer = this.provider.getSigner();

    // check network
    const { chainId } = await this.provider.getNetwork();
    if (
      chainId !=
      (network == "polygon" ? networkIds.polygon : networkIds.mumbai)
    ) {
      throw new Error("Make sure you are on the correct network.");
    }

    // get wallet address
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    this.walletAddress = accounts[0];
  };

  /**
   * @notice you need to connect wallet or rpc first
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   */
  autoOffset = async (
    poolSymbol: string,
    amount: string,
    network: "polygon" | "mumbai"
  ): Promise<ethers.ContractReceipt> => {
    if (!this.provider) {
      throw new Error("Make sure you connected a provider.");
    }

    const extractedAddresses =
      network == "polygon" ? addresses.polygon : addresses.mumbai;

    const poolTokenAddress =
      poolSymbol == "BCT" ? extractedAddresses.bct : extractedAddresses.nct;

    // approve OffsetHelper from pool token
    const poolToken = new ethers.Contract(
      poolTokenAddress,
      poolAbi,
      this.signer
    );

    const approveTxn: ethers.ContractTransaction = await poolToken.approve(
      extractedAddresses.offsetHelper,
      parseEther(amount)
    );

    // wait for approval receipt
    await approveTxn.wait();

    const offsetHelper = new ethers.Contract(
      extractedAddresses.offsetHelper,
      offseterAbi,
      this.signer
    );
    const offsetTxn: ethers.ContractTransaction =
      await offsetHelper.autoOffsetUsingPoolToken(
        extractedAddresses.nct,
        parseEther(amount),
      );

    // wait for offset receipt
    return await offsetTxn.wait();
  };
}

export default OffsetHelperClient;
