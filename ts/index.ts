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

// @ts-ignore
const { ethereum } = window;

/**
 * @notice to be used in the browser
 * @param networkId the network you want to connect the user to ("polygon" or "mumbai")
 * @returns a string representing the connected wallet address or an error if it fails
 */
export const connectWallet = async (
  network: "polygon" | "mumbai"
): Promise<connectReturn | Error> => {
  try {
    if (!ethereum) {
      throw new Error("You need a wallet.");
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork();
    if (
      chainId != (network == "polygon" ? networkIds.polygon : networkIds.mumbai)
    ) {
      throw new Error("Make sure you are on the correct network.");
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return { walletAddress: accounts[0], provider: provider };
  } catch (error: any) {
    console.error("error when connecting metamask:", error.message);
    return error;
  }
};

/**
 *
 * @param poolToken either BCT or NCT
 * @param amount amount of CO2 tons to offset
 */
export const autoOffset = async (
  poolSymbol: string,
  amount: string
): Promise<ethers.ContractReceipt> => {
  // TODO make the provider configurable
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const poolTokenAddress = poolSymbol == "BCT" ? addresses.bct : addresses.nct;

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
};
