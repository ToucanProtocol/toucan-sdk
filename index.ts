import {
  BigNumber,
  Contract,
  ContractReceipt,
  ContractTransaction,
  ethers,
} from "ethers";

import {
  IToucanCarbonOffsets,
  IToucanContractRegistry,
  IToucanPoolToken,
  OffsetHelper,
} from "./typechain";
import { Network, poolSymbol, providerish, signerish } from "./types";
import {
  offsetHelperABI,
  poolTokenABI,
  toucanContractRegistryABI,
} from "./utils/ABIs";
import addresses, { IfcOneNetworksAddresses } from "./utils/addresses";

class ToucanClient {
  provider: providerish;
  signer: signerish;
  walletAddress: string;
  network: Network;
  addresses: IfcOneNetworksAddresses;
  offsetHelper: OffsetHelper;
  bct: IToucanPoolToken;
  nct: IToucanPoolToken;
  ToucanContractRegistry: IToucanContractRegistry;

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
    // @ts-ignore
    this.ToucanContractRegistry = new ethers.Contract(
      this.addresses.toucanContractRegistry,
      toucanContractRegistryABI,
      this.signer
    );
  }

  /**
   * @description deposits TCO2s in the pool which mints a pool token for the user
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of TCO2s to deposit
   * @param tco2 contract of TCO2 to deposit
   * @returns deposit transaction
   */
  depositTCO2 = async (
    poolSymbol: poolSymbol,
    amount: BigNumber,
    tco2: IToucanCarbonOffsets
  ) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const approveTxn: ContractTransaction = await tco2.approve(
      poolToken.address,
      amount
    );
    await approveTxn.wait();

    const depositTxn: ContractTransaction = await poolToken.deposit(
      tco2.address,
      amount,
      { gasLimit: 2500000 }
    );
    return await depositTxn.wait();
  };

  /**
   * @description checks if TCO2 is eligible for pool
   * @param poolSymbol symbol of the pool (token) to use
   * @param tco2 address of TCO2 to deposit
   * @returns boolean
   */
  checkEligible = async (poolSymbol: poolSymbol, tco2: string) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await poolToken.checkEligible(tco2);
  };

  /**
   * @description calculates the fees to selectively redeem pool tokens for TCO2s
   * @param poolSymbol symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @returns amount (BigNumber) of fees it will cost to redeem
   */
  calculateRedeemFees = async (
    poolSymbol: poolSymbol,
    tco2s: string[],
    amounts: BigNumber[]
  ) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await poolToken.calculateRedeemFees(tco2s, amounts);
  };

  /**
   * @description selectively redeems pool tokens for TCO2s
   * @param poolSymbol symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @returns redeem transaction
   */
  redeemMany = async (
    poolSymbol: poolSymbol,
    tco2s: string[],
    amounts: BigNumber[]
  ) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const redeemTxn: ContractTransaction = await poolToken.redeemMany(
      tco2s,
      amounts,
      { gasLimit: 2500000 }
    );
    return await redeemTxn.wait();
  };

  /**
   * @description automatically redeems pool tokens for TCO2s
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns redeem transaction
   */
  redeemAuto = async (poolSymbol: poolSymbol, amount: BigNumber) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const redeemTxn: ContractTransaction = await poolToken.redeemAuto(amount, {
      gasLimit: 2500000,
    });
    return await redeemTxn.wait();
  };

  /**
   * @description automatically redeems pool tokens for TCO2s
   * @notice costs more gas than redeemAuto()
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns array containing tco2 addresses (string) and amounts (BigNumber)
   */
  redeemAuto2 = async (poolSymbol: poolSymbol, amount: BigNumber) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    const redeemReceipt = await (
      await poolToken.redeemAuto2(amount, { gasLimit: 2500000 })
    ).wait();

    if (!redeemReceipt.events) {
      throw new Error("No events to get tco2 addresses and amounts from");
    }

    return redeemReceipt.events
      .filter((event) => {
        return (
          event.event == "Redeemed" && event.args?.erc20 && event.args?.amount
        );
      })
      .map((event) => {
        return { address: event.args?.erc20, amount: event.args?.amount };
      });
  };

  /**
   *
   * @param poolSymbol symbol of the pool (token) to use
   * @returns amount (BigNumber) of remaining space in pool before hitting the cap
   */
  getRemaining = async (poolSymbol: poolSymbol) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await poolToken.getRemaining();
  };

  /**
   *
   * @param poolSymbol symbol of the pool (token) to use
   * @returns array of TCO2 addresses by rank; scoredTCO2s[0] is lowest ranked
   */
  getScoredTCO2s = async (poolSymbol: poolSymbol) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await poolToken.getScoredTCO2s();
  };

  /**
   *
   * @param address address of contract to check
   * @returns true if TCO2, false if not
   */
  checkIfTCO2 = async (address: string) => {
    return await this.ToucanContractRegistry.checkERC20(address);
  };

  /**
   * @description allows user to retire carbon using carbon pool tokens from his wallet
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @returns offset transaction
   */
  autoOffsetUsingPoolToken = async (
    poolSymbol: poolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const approveTxn: ContractTransaction = await poolToken.approve(
      this.addresses.offsetHelper,
      amount
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingPoolToken(
        this.addresses.nct,
        amount,
        { gasLimit: 2500000 }
      );
    return await offsetTxn.wait();
  };

  /**
   * @description swaps given token for carbon pool tokens and uses them to retire carbon
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @returns offset transaction
   */
  autoOffsetUsingSwapToken = async (
    poolSymbol: poolSymbol,
    amount: BigNumber,
    swapToken: Contract
  ): Promise<ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const approveTxn: ContractTransaction = await swapToken.approve(
      this.addresses.offsetHelper,
      await this.offsetHelper.calculateNeededTokenAmount(
        swapToken.address,
        poolToken.address,
        amount
      )
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingToken(
        swapToken.address,
        poolToken.address,
        amount,
        { gasLimit: 2500000 }
      );
    return await offsetTxn.wait();
  };

  /**
   * @description swaps ETH for carbon pool tokens and uses them to retire carbon
   * @notice this method may take up to even 1 minute to give a result
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @returns offset transaction
   */
  autoOffsetUsingETH = async (
    poolSymbol: poolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingETH(poolToken.address, amount, {
        gasLimit: 2500000,
        value: await this.offsetHelper.calculateNeededETHAmount(
          poolToken.address,
          amount
        ),
      });
    return await offsetTxn.wait();
  };

  /**
   * @description calculates the needed amount of tokens to send to offset
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @param swapToken contract of the token to use in swap
   * @returns amount (BigNumber) of swapToken needed to deposit
   */
  calculateNeededTokenAmount = async (
    poolSymbol: poolSymbol,
    amount: BigNumber,
    swapToken: Contract
  ) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await this.offsetHelper.calculateNeededTokenAmount(
      swapToken.address,
      poolToken.address,
      amount
    );
  };

  /**
   * @description calculates the needed amount of ETH to send to offset; ETH = native currency of network you are on
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @returns amount (BigNumber) of ETH needed to deposit; ETH = native currency of network you are on
   */
  calculateNeededETHAmount = async (
    poolSymbol: poolSymbol,
    amount: BigNumber
  ) => {
    const poolToken = poolSymbol == "BCT" ? this.bct : this.nct;
    return await this.offsetHelper.calculateNeededETHAmount(
      poolToken.address,
      amount
    );
  };
}

export default ToucanClient;
