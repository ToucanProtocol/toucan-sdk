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

type connectReturn = {
  walletAddress: string;
  provider: ethers.providers.Web3Provider;
};

class OffsetHelperClient {
  provider:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcProvider
    | undefined;

  constructor() {}

  /**
   * @notice to be used on the backend
   * @param rpcUrl the rpc url you want to use for the provider (can be an Infura or Alchemy url)
   */
  connectRpc = (rpcUrl?: string, network?: "polygon" | "mumbai") => {
    try {
      const defaultUrl =
        network == "polygon"
          ? process.env.MATIC_NODE_API_RPC_URL
          : process.env.MUMBAI_NODE_API_RPC_URL;
      this.provider = new ethers.providers.JsonRpcProvider(
        rpcUrl || defaultUrl || ""
      );
    } catch (error: any) {
      console.error("error when connecting rpc:", error.message);
      return error;
    }
  };

  /**
   * @notice to be used in the browser
   * @param networkId the network you want to connect the user to ("polygon" or "mumbai")
   * @returns a string representing the connected wallet address or an error if it fails
   */
  connectWallet = async (
    network: "polygon" | "mumbai"
  ): Promise<connectReturn | Error> => {
    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("You need a wallet.");
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (
        chainId !=
        (network == "polygon" ? networkIds.polygon : networkIds.mumbai)
      ) {
        throw new Error("Make sure you are on the correct network.");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      return { walletAddress: accounts[0], provider: provider };
    } catch (error: any) {
      console.error("error when connecting wallet", error.message);
      return error;
    }
  };

  /**
   *
   * @param poolToken either BCT or NCT
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

      const signer = this.provider.getSigner();

      const poolTokenAddress =
        poolSymbol == "BCT" ? addresses.bct : addresses.nct;

      // approve OffsetHelper from pool token
      const poolToken = new ethers.Contract(poolTokenAddress, poolAbi, signer);

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
        signer
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
