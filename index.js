import { ethers } from "ethers";

const offseterAbi = [
  'function autoOffsetUsingPoolToken(address _poolToken, uint256 _amountToOffset)',
]

export const autoOffset = async (poolToken, amount) => {
    const provider = new ethers.providers.Web3Provider(process.env.NODE_API_RPC_URL);
    const signer = provider.getSigner();

    const offsetter = new ethers.Contract(
      process.env.OFFSETER_CONTRACT_ADDRESS || "",
      offseterAbi,
      signer
    );

    await offsetter.autoOffsetUsingPoolToken(poolToken, amount);
}
