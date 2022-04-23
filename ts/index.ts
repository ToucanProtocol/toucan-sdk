import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import addresses from "./utils/addresses";

const poolAbi = [
  "function approve(address _poolToken, uint256 _amountToOffset)",
];

const offseterAbi = [
  "function autoOffsetUsingPoolToken(address spender, uint256 amount)",
];

// @ts-ignore
const { ethereum } = window;

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
