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
import { GAS_LIMIT } from "./utils";
import {
  offsetHelperABI,
  poolTokenABI,
  tco2ABI,
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
  TCO2: IToucanCarbonOffsets | undefined;

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

  // --------------------------------------------------------------------------------
  //  TCO2 related methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description stores the ethers.Contract to a TCO2
   * @param address address of TCO2 ethers.Contract to insantiate
   */
  instantiateTCO2 = async (address: string): Promise<void> => {
    if (!this.checkIfTCO2(address))
      throw new Error(`${address} is not a TCO2 address`);
    // @ts-ignore
    this.TCO2 = new ethers.Contract(address, tco2ABI, this.signer);
  };

  /**
   *
   * @description retires/burns an amount of TCO2s (each represents 1 ton of CO2) to achieve offset
   * @param amount amount of TCO2 to retire
   * @returns retirement transaction
   */
  retire = async (amount: BigNumber): Promise<ContractReceipt> => {
    if (!this.TCO2)
      throw new Error("You need to instantiate a TCO2 contract first");

    const retirementTxn: ContractTransaction = await this.TCO2.retire(amount, {
      gasLimit: GAS_LIMIT,
    });
    // TODO get retirementEventId ?
    return await retirementTxn.wait();
  };

  /**
   *
   * @description retires/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction
   * @param retirementEntityName name of the entity that does the retirement (you)
   * @param beneficiaryAddress address of the beneficiary (in case you're retiring for someone else)
   * @param beneficiaryName name of the beneficiary
   * @param retirementMessage retirement message
   * @param amount amount of TCO2 to retire
   * @returns retirement transaction
   */
  retireAndMintCertificate = async (
    retirementEntityName: string,
    beneficiaryAddress: string,
    beneficiaryName: string,
    retirementMessage: string,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    if (!this.TCO2)
      throw new Error("You need to instantiate a TCO2 contract first");

    const retirementTxn: ContractTransaction =
      await this.TCO2.retireAndMintCertificate(
        retirementEntityName,
        beneficiaryAddress,
        beneficiaryName,
        retirementMessage,
        amount,
        { gasLimit: GAS_LIMIT }
      );
    return await retirementTxn.wait();
  };

  /**
   *
   * @description retires/burns an amount of TCO2s from a different address/wallet
   * @notice requires approval from the address you're trying to retire from
   * @param amount amount of TCO2 to retire
   * @param address address of the account to retire from
   * @returns retirement transaction
   */
  retireFrom = async (
    amount: BigNumber,
    address: string
  ): Promise<ContractReceipt> => {
    if (!this.TCO2)
      throw new Error("You need to instantiate a TCO2 contract first");

    const retirementTxn: ContractTransaction = await this.TCO2.retireFrom(
      address,
      amount,
      {
        gasLimit: GAS_LIMIT,
      }
    );
    // TODO get retirementEventId ?
    return await retirementTxn.wait();
  };

  /**
   *
   * @description gets the cap for TCO2s based on `totalVintageQuantity`
   * @returns BigNumber representing the cap
   */
  getDepositCap = async (): Promise<BigNumber> => {
    if (!this.TCO2)
      throw new Error("You need to instantiate a TCO2 contract first");
    return await this.TCO2.getDepositCap();
  };

  /**
   *
   * @description gets the attributes of the project represented by the TCO2
   * @returns an array of attributes
   */
  getAttributes = async () => {
    // TODO: a return TS type
    if (!this.TCO2)
      throw new Error("You need to instantiate a TCO2 contract first");
    return await this.TCO2.getAttributes();
  };

  /**
   *
   * @description gets the remaining space in TCO2 contract before hitting the cap
   * @returns BigNumber representing the remaining space
   */
  getTCO2Remaining = async (): Promise<BigNumber> => {
    if (!this.TCO2)
      throw new Error("You need to instantiate a TCO2 contract first");
    return await this.TCO2.getRemaining();
  };

  // --------------------------------------------------------------------------------
  //  Pool related methods
  // --------------------------------------------------------------------------------

  /**
   *
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
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(poolSymbol);

    const approveTxn: ContractTransaction = await tco2.approve(
      poolToken.address,
      amount
    );
    await approveTxn.wait();

    const depositTxn: ContractTransaction = await poolToken.deposit(
      tco2.address,
      amount,
      { gasLimit: GAS_LIMIT }
    );
    return await depositTxn.wait();
  };

  /**
   *
   * @description checks if TCO2 is eligible for pool
   * @param poolSymbol symbol of the pool (token) to use
   * @param tco2 address of TCO2 to deposit
   * @returns boolean
   */
  checkEligible = async (
    poolSymbol: poolSymbol,
    tco2: string
  ): Promise<boolean> => {
    const poolToken = this.getPoolContract(poolSymbol);
    return await poolToken.checkEligible(tco2);
  };

  /**
   *
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
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(poolSymbol);
    return await poolToken.calculateRedeemFees(tco2s, amounts);
  };

  /**
   *
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
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(poolSymbol);

    const redeemTxn: ContractTransaction = await poolToken.redeemMany(
      tco2s,
      amounts,
      { gasLimit: GAS_LIMIT }
    );
    return await redeemTxn.wait();
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns redeem transaction
   */
  redeemAuto = async (
    poolSymbol: poolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(poolSymbol);

    const redeemTxn: ContractTransaction = await poolToken.redeemAuto(amount, {
      gasLimit: GAS_LIMIT,
    });
    return await redeemTxn.wait();
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @notice costs more gas than redeemAuto()
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns array containing tco2 addresses (string) and amounts (BigNumber)
   */
  redeemAuto2 = async (
    poolSymbol: poolSymbol,
    amount: BigNumber
  ): Promise<{ address: string; amount: BigNumber }[]> => {
    const poolToken = this.getPoolContract(poolSymbol);
    const redeemReceipt = await (
      await poolToken.redeemAuto2(amount, { gasLimit: GAS_LIMIT })
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
   * @description gets the remaining space in pool contract before hitting the cap
   * @param tokenSymbol symbol of the token to use
   * @returns BigNumber representing the remaining space
   */
  getPoolRemaining = async (tokenSymbol: poolSymbol): Promise<BigNumber> => {
    const poolToken = tokenSymbol == "BCT" ? this.bct : this.nct;
    return await poolToken.getRemaining();
  };

  /**
   *
   * @description gets an array of scored TCO2s; scoredTCO2s[0] is lowest ranked
   * @param poolSymbol symbol of the pool (token) to use
   * @returns array of TCO2 addresses by rank
   */
  getScoredTCO2s = async (poolSymbol: poolSymbol): Promise<string[]> => {
    const poolToken = this.getPoolContract(poolSymbol);
    return await poolToken.getScoredTCO2s();
  };

  // --------------------------------------------------------------------------------
  //  Contract registry related methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description checks if an address represents a TCO2
   * @param address address of contract to check
   * @returns boolean
   */
  checkIfTCO2 = async (address: string): Promise<boolean> => {
    return await this.ToucanContractRegistry.checkERC20(address);
  };

  // --------------------------------------------------------------------------------
  //  OffsetHelper related methods
  // --------------------------------------------------------------------------------

  /**
   *
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
    const poolToken = this.getPoolContract(poolSymbol);

    const approveTxn: ContractTransaction = await poolToken.approve(
      this.addresses.offsetHelper,
      amount
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingPoolToken(
        this.addresses.nct,
        amount,
        { gasLimit: GAS_LIMIT }
      );
    return await offsetTxn.wait();
  };

  /**
   *
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
    const poolToken = this.getPoolContract(poolSymbol);

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
        { gasLimit: GAS_LIMIT }
      );
    return await offsetTxn.wait();
  };

  /**
   *
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
    const poolToken = this.getPoolContract(poolSymbol);

    const offsetTxn: ContractTransaction =
      await this.offsetHelper.autoOffsetUsingETH(poolToken.address, amount, {
        gasLimit: GAS_LIMIT,
        value: await this.offsetHelper.calculateNeededETHAmount(
          poolToken.address,
          amount
        ),
      });
    return await offsetTxn.wait();
  };

  /**
   *
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
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(poolSymbol);
    return await this.offsetHelper.calculateNeededTokenAmount(
      swapToken.address,
      poolToken.address,
      amount
    );
  };

  /**
   *
   * @description calculates the needed amount of ETH to send to offset; ETH = native currency of network you are on
   * @param poolSymbol symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @returns amount (BigNumber) of ETH needed to deposit; ETH = native currency of network you are on
   */
  calculateNeededETHAmount = async (
    poolSymbol: poolSymbol,
    amount: BigNumber
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(poolSymbol);
    return await this.offsetHelper.calculateNeededETHAmount(
      poolToken.address,
      amount
    );
  };

  // --------------------------------------------------------------------------------
  //  Internal methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description gets the contract of a pool token based on the symbol
   * @param poolSymbol symbol of the pool (token) to use
   * @returns a ethers.contract to interact with the pool
   */
  private getPoolContract = (poolSymbol: poolSymbol): IToucanPoolToken => {
    return poolSymbol == "BCT" ? this.bct : this.nct;
  };
}

export default ToucanClient;
