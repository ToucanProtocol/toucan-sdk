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
  ) => {
    try {
      this.provider = new ethers.providers.JsonRpcProvider(
        rpcUrl || process.env.NODE_API_RPC_URL || ""
      );
      this.signer = new ethers.Wallet(
        privateKey || process.env.PRIVATE_KEY || "",
        this.provider
      );
      this.walletAddress = walletAddress;
    } catch (error: any) {
      console.error("error when connecting rpc:", error.message);
      return error;
    }
  };

  /**
   * @notice to be used in the browser
   * @param network the network you want to connect the user to ("polygon" or "mumbai")
   * @returns a string representing the connected wallet address or an error if it fails
   */
  connectWallet = async (network: "polygon" | "mumbai") => {
    try {
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
    } catch (error: any) {
      console.error("error when connecting wallet", error.message);
      return error;
    }
  };

  /**
   * @notice you need to connect wallet or rpc first
   * @param poolSymbol either "BCT" or "NCT"
   * @param amount amount of CO2 tons to offset
   */
  autoOffset = async (
    poolSymbol: string,
    amount: string
  ): Promise<ethers.ContractReceipt | Error> => {
    try {
      if (!this.provider) {
        throw new Error("Make sure you connected a provider.");
      }

      const poolTokenAddress =
        poolSymbol == "BCT" ? addresses.bct : addresses.nct;

      // approve OffsetHelper from pool token
      const poolToken = new ethers.Contract(
        poolTokenAddress,
        poolAbi,
        this.signer
      );

      const approveTxn: ethers.ContractTransaction = await poolToken.approve(
        addresses.offsetHelper,
        parseEther(amount)
      );

      // wait for approval receipt
      await approveTxn.wait();

      // auto offset using pool token
      const offsetHelper = new ethers.Contract(
        addresses.offsetHelper,
        offseterAbi,
        this.signer
      );
      const offsetTxn: ethers.ContractTransaction =
        await offsetHelper.autoOffsetUsingPoolToken(
          addresses.nct,
          parseEther(amount)
        );

      // wait for offset receipt
      return await offsetTxn.wait();
    } catch (error: any) {
      console.error("error when offseting", error.message);
      return error;
    }
  };
}

export default OffsetHelperClient;
