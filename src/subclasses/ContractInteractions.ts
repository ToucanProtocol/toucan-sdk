/**
  The OffsetHelper's purpose is to simplify the carbon offsetting process.
  Copyright (C) 2022 Toucan Labs

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import {
  BigNumber,
  Contract,
  ContractReceipt,
  ContractTransaction,
  ethers,
} from "ethers";

import { IToucanPoolToken } from "../typechain/legacy";
import { OffsetHelper } from "../typechain/misc";
import {
  ToucanCarbonOffsets,
  ToucanContractRegistry,
} from "../typechain/protocol";
import { PoolSymbol } from "../types";
import { RedeemAutoResponse } from "../types/responses";
import { GAS_LIMIT } from "../utils";
import {
  offsetHelperABI,
  poolTokenABI,
  tco2ABI,
  toucanContractRegistryABI,
} from "../utils/ABIs";
import addresses, { INetworkTokenAddresses } from "../utils/addresses";

/**
 * @class ContractInteractions
 * @description This class helps interact with Toucan contracts
 */
class ContractInteractions {
  addresses: INetworkTokenAddresses;

  /**
   *
   * @param network network that you want to work on
   */
  constructor(network: string) {
    this.addresses = addresses[network];
    if (!this.addresses) throw new Error(`Unknown network: ${network}`);
  }

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  TCO2 related functions
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description retires/offset/burns an amount of TCO2s (each represents 1 ton of CO2).
   * If you don't own any TCO2s you need to buy pool tokens, e.g.,
   * NCTs on a DEX and redeem these first.
   * @param amount The amount of TCO2 to retire
   * @param tco2Address address of the TCO2 token to retire
   * @param signer this being a write transaction, we need a signer
   * @returns retirement transaction
   */
  retire = async (
    amount: BigNumber,
    tco2Address: string,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const TCO2 = this.getTCO2Contract(tco2Address, signer);

    const retirementTxn: ContractTransaction = await TCO2.retire(amount, {
      gasLimit: GAS_LIMIT,
    });
    // TODO get retirementEventId ?
    return await retirementTxn.wait();
  };

  /**
   *
   * @description retires/offset/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction. If you don't own any TCO2s you need to buy pool tokens, e.g.,
   * NCTs on a DEX and redeem these first.
   * @param retirementEntityName name of the entity that does the retirement (you)
   * @param beneficiaryAddress address of the beneficiary (in case you're retiring for someone else)
   * @param beneficiaryName name of the beneficiary
   * @param retirementMessage retirement message
   * @param amount The amount of TCO2 to retire
   * @param tco2Address address of the TCO2 token to retire
   * @param signer this being a write transaction, we need a signer
   * @returns retirement transaction
   */
  retireAndMintCertificate = async (
    retirementEntityName: string,
    beneficiaryAddress: string,
    beneficiaryName: string,
    retirementMessage: string,
    amount: BigNumber,
    tco2Address: string,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const TCO2 = this.getTCO2Contract(tco2Address, signer);

    const retirementTxn: ContractTransaction =
      await TCO2.retireAndMintCertificate(
        retirementEntityName,
        beneficiaryAddress,
        beneficiaryName,
        retirementMessage,
        amount
      );
    return await retirementTxn.wait();
  };

  /**
   *
   * @description retires/offset/burns an amount of TCO2s from a different address/wallet. If you don't own any TCO2s you need to buy pool tokens, e.g.,
   * NCTs on a DEX and redeem these first.
   * @notice requires approval from the address you're trying to retire from
   * @param amount The amount of TCO2 to retire
   * @param address address of the account to retire from
   * @param tco2Address address of the TCO2 token to retire
   * @param signer this being a write transaction, we need a signer
   * @returns retirement transaction
   */
  retireFrom = async (
    amount: BigNumber,
    address: string,
    tco2Address: string,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const TCO2 = this.getTCO2Contract(tco2Address, signer);

    const retirementTxn: ContractTransaction = await TCO2.retireFrom(
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
   * @param tco2Address address of the TCO2 token
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns
   */
  getDepositCap = async (
    tco2Address: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const TCO2 = this.getTCO2Contract(tco2Address, signerOrProvider);
    return await TCO2.getDepositCap();
  };

  /**
   *
   * @description gets the attributes of the project represented by the TCO2
   * @param tco2Address address of the TCO2 token
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns an array of attributes
   */
  getAttributes = async (
    tco2Address: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ) => {
    // TODO: a return TS type
    const TCO2 = this.getTCO2Contract(tco2Address, signerOrProvider);
    return await TCO2.getAttributes();
  };

  /**
   *
   * @description gets the remaining space in TCO2 contract before hitting the cap
   * @param tco2Address address of the TCO2 token
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns BigNumber representing the remaining space
   */
  getTCO2Remaining = async (
    tco2Address: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const TCO2 = this.getTCO2Contract(tco2Address, signerOrProvider);
    return await TCO2.getRemaining();
  };

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  Pool related functions
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description deposits TCO2s in the pool which mints a pool token for the user
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of TCO2s to deposit
   * @param tco2Address address of the TCO2 token to deposit
   * @param signer this being a write transaction, we need a signer
   * @returns deposit transaction
   */
  depositTCO2 = async (
    pool: PoolSymbol,
    amount: BigNumber,
    tco2Address: string,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool, signer);

    const TCO2 = this.getTCO2Contract(tco2Address, signer);

    const approveTxn: ContractTransaction = await TCO2.approve(
      poolToken.address,
      amount
    );
    await approveTxn.wait();

    const depositTxn: ContractTransaction = await poolToken.deposit(
      tco2Address,
      amount
    );
    return await depositTxn.wait();
  };

  /**
   *
   * @description checks if TCO2 is eligible for pool
   * @param pool The pool symbol of the pool (token) to use
   * @param tco2 address of TCO2 to deposit
   * @returns boolean
   */
  checkEligible = async (
    pool: PoolSymbol,
    tco2: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<boolean> => {
    const poolToken = this.getPoolContract(pool, signerOrProvider);
    return await poolToken.checkEligible(tco2);
  };

  /**
   *
   * @description calculates the fees to selectively redeem pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount The amount of fees it will cost to redeem
   */
  calculateRedeemFees = async (
    pool: PoolSymbol,
    tco2s: string[],
    amounts: BigNumber[],
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(pool, signerOrProvider);
    return await poolToken.calculateRedeemFees(tco2s, amounts);
  };

  /**
   *
   * @description selectively redeems pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @param signer this being a write transaction, we need a signer
   * @returns redeem transaction
   */
  redeemMany = async (
    pool: PoolSymbol,
    tco2s: string[],
    amounts: BigNumber[],
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool, signer);

    const redeemTxn: ContractTransaction = await poolToken.redeemMany(
      tco2s,
      amounts
    );
    return await redeemTxn.wait();
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount to redeem
   * @param signer this being a write transaction, we need a signer
   * @returns redeem transaction
   */
  redeemAuto = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<RedeemAutoResponse> => {
    const poolToken = this.getPoolContract(pool, signer);
    const redeemReceipt = await (
      await poolToken.redeemAuto(amount, { gasLimit: GAS_LIMIT })
    ).wait();

    if (!redeemReceipt.events) {
      throw new Error("No events to get tco2 addresses and amounts from");
    }

    return redeemReceipt.events.reduce(
      (acc: Array<{ address: string; amount: BigNumber }>, event) => {
        if (
          event.event === "Redeemed" &&
          event.args?.erc20 &&
          event.args?.amount
        ) {
          acc.push({ address: event.args.erc20, amount: event.args.amount });
        }
        return acc;
      },
      []
    );
  };

  /**
   * @deprecated This function is deprecated. Please use `redeemAuto` instead.
   * @description automatically redeems pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount to redeem
   * @param signer this being a write transaction, we need a signer
   * @returns array containing tco2 addresses (string) and amounts (BigNumber)
   */
  redeemAuto2 = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<RedeemAutoResponse> => {
    const poolToken = this.getPoolContract(pool, signer);
    const redeemReceipt = await (await poolToken.redeemAuto2(amount)).wait();

    if (!redeemReceipt.events) {
      throw new Error("No events to get tco2 addresses and amounts from");
    }

    return redeemReceipt.events.reduce(
      (acc: Array<{ address: string; amount: BigNumber }>, event) => {
        if (
          event.event === "Redeemed" &&
          event.args?.erc20 &&
          event.args?.amount
        ) {
          acc.push({ address: event.args.erc20, amount: event.args.amount });
        }
        return acc;
      },
      []
    );
  };

  /**
   *
   * @description gets the remaining space in pool contract before hitting the cap
   * @param PoolSymbol symbol of the token to use
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns BigNumber representing the remaining space
   */
  getPoolRemaining = async (
    pool: PoolSymbol,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(pool, signerOrProvider);
    return await poolToken.getRemaining();
  };

  /**
   *
   * @description gets an array of scored TCO2s; scoredTCO2s[0] is lowest ranked
   * @param pool The pool symbol of the pool (token) to use
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns array of TCO2 addresses by rank
   */
  getScoredTCO2s = async (
    pool: PoolSymbol,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<string[]> => {
    const poolToken = this.getPoolContract(pool, signerOrProvider);
    return await poolToken.getScoredTCO2s();
  };

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  Contract registry related functions
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description checks if an address represents a TCO2
   * @param address address of contract to check
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns boolean
   */
  checkIfTCO2 = async (
    address: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<boolean> => {
    const registry = this.getRegistryContract(signerOrProvider);
    return await registry.checkERC20(address);
  };

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  OffsetHelper related functions
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description retires carbon credits using the oldest TCO2
   * tokens available by sending pool tokens, e.g., NCT.
   * @param pool The pool symbol of the pool token to offset,
   * e.g., NCT
   * @param amount The amount of TCO2s to deposit
   * @param signer this being a write transaction, we need a signer
   * @returns The offset transaction.
   */
  autoOffsetPoolToken = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool, signer);

    const approveTxn: ContractTransaction = await poolToken.approve(
      this.addresses.offsetHelper,
      amount
    );
    await approveTxn.wait();

    const offsetHelper = this.getOffsetHelperContract(signer);

    const offsetTxn: ContractTransaction =
      await offsetHelper.autoOffsetPoolToken(this.addresses.nct, amount, {
        gasLimit: GAS_LIMIT,
      });
    return await offsetTxn.wait();
  };

  /**
   *
   * @description Retire a specified amount of carbon credits using the oldest TCO2 tokens available from the specified pool by sending ERC20
   * tokens (cUSD, USDC, WETH, WMATIC).
   * @notice This method needs two different actions signed and may take up to 1 minute to return a result
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of CO2 tons to offset
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetExactOutToken = async (
    swapToken: Contract,
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const poolAddress = this.getPoolAddress(pool);
    const offsetHelper = this.getOffsetHelperContract(signer);

    const approveTxn: ContractTransaction = await swapToken.approve(
      this.addresses.offsetHelper,
      await offsetHelper.calculateNeededTokenAmount(
        swapToken.address,
        poolAddress,
        amount
      )
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await offsetHelper.autoOffsetExactOutToken(
        swapToken.address,
        poolAddress,
        amount
      );
    return await offsetTxn.wait();
  };

  /**
   *
   * @description retire carbon credits using the oldest TCO2 tokens available from the specified pool by sending ERC20
   * tokens (cUSD, USDC, WETH, WMATIC). All provided tokens are consumed for offsetting.
   * @notice This method needs two different actions signed and may take up to 1 minute to return a result
   * @dev When automatically redeeming pool tokens for the oldest ones
   * TCO2s there are no fees and you receive exactly 1 TCO2 token for 1 pool
   * token.
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @param pool The pool symbol of the pool (token) to use
   * @param amount the amount of ERC20 token to swap into Toucan pool token. Full amount will be used for offsetting.
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetExactInToken = async (
    swapToken: Contract,
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const poolAddress = this.getPoolAddress(pool);
    const offsetHelper = this.getOffsetHelperContract(signer);

    const approveTxn: ContractTransaction = await swapToken.approve(
      this.addresses.offsetHelper,
      amount
    );
    await approveTxn.wait();

    const offsetTxn: ContractTransaction =
      await offsetHelper.autoOffsetExactInToken(
        swapToken.address,
        poolAddress,
        amount
      );
    return await offsetTxn.wait();
  };

  /**
   *
   * @description Retire a specified amount of carbon credits using the oldest TCO2 tokens available from the specified pool by sending a native token e.g. MATIC.
   * @dev Use `calculateNeededETHAmount()` first in order to find out how much of the native token e.g. MATIC is required to retire the specified quantity of TCO2. If the user sends much native token e.g. MATIC, the leftover amount will be sent back to the user.
   * @notice This method may take up to 1 minute to return a result
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of CO2 tons to offset
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetExactOutETH = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const offsetHelper = this.getOffsetHelperContract(signer);
    const poolAddress = this.getPoolAddress(pool);

    const offsetTxn: ContractTransaction =
      await offsetHelper.autoOffsetExactOutETH(poolAddress, amount, {
        gasLimit: GAS_LIMIT,
        value: await offsetHelper.calculateNeededETHAmount(poolAddress, amount),
      });
    return await offsetTxn.wait();
  };

  /**
   *
   * @description swaps ETH for carbon pool tokens and uses them to retire carbon
   * @notice This method may take up to 1 minute to return a result
   * @param pool The pool symbol of the pool (token) to use e.g., "NCT"
   * @param amount the amount of native tokens e.g., MATIC to swap into Toucan pool token. Full amount will be used for offsetting.
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetExactInETH = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const offsetHelper = this.getOffsetHelperContract(signer);
    const poolAddress = this.getPoolAddress(pool);

    const offsetTxn: ContractTransaction =
      await offsetHelper.autoOffsetExactInETH(poolAddress, {
        gasLimit: GAS_LIMIT,
        value: amount,
      });
    return await offsetTxn.wait();
  };

  /**
   *
   * @description Calculates how much of the specified ERC20 token is required in
   * order to swap for the desired amount of a Toucan pool token, for
   * example, e.g., NCT.
   * @param swapToken The ERC20 token used for the swap
   * @param pool The pool symbol of the pool token to swap for,
   *  e.g., NCT
   * @param amount The desired amount of pool token to receive
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount The amount of the ERC20 token required in order to
   * swap for the specified amount of the pool token
   */
  calculateNeededTokenAmount = async (
    swapToken: Contract,
    pool: PoolSymbol,
    amount: BigNumber,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const offsetHelper = this.getOffsetHelperContract(signerOrProvider);
    return await offsetHelper.calculateNeededTokenAmount(
      swapToken.address,
      this.getPoolAddress(pool),
      amount
    );
  };

  /**
   *
   * @description Calculates the amount of native tokens e.g, MATIC is required in order to swap for the
   * desired amount of a Toucan pool token, e.g., NCT.
   * @param pool The pool symbol of the pool token to swap for,
   *  e.g., NCT
   * @param amount The desired amount of pool token to receive
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount The amount of native tokens, e.g., MATIC required in order to swap for
   * the specified amount of the pool token
   */
  calculateNeededETHAmount = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const offsetHelper = this.getOffsetHelperContract(signerOrProvider);
    return await offsetHelper.calculateNeededETHAmount(
      this.getPoolAddress(pool),
      amount
    );
  };

  /**
   *
   * @description Calculates the expected amount of Toucan Pool token that can be
   * acquired by swapping the provided amount of ERC20 token.
   *
   * @param swapToken The ERC20 token used for the swap
   * @param pool The pool symbol of the pool token to swap for,
   *  e.g., NCT
   * @param amount The amount of ERC20 token to swap
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount The amount The expected amount of Pool token that can be acquired
   */
  calculateExpectedPoolTokenForToken = async (
    swapToken: Contract,
    pool: PoolSymbol,
    amount: BigNumber,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const offsetHelper = this.getOffsetHelperContract(signerOrProvider);
    return await offsetHelper.calculateExpectedPoolTokenForToken(
      swapToken.address,
      this.getPoolAddress(pool),
      amount
    );
  };

  /**
   *
   * @description Calculates the expected amount of Toucan Pool token that can be
   * acquired by swapping the provided amount of native tokens e.g., MATIC.
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of native tokens to swap for,
   *  e.g., MATIC
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount The amount The expected amount of Pool token that can be acquired
   */
  calculateExpectedPoolTokenForETH = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): Promise<BigNumber> => {
    const offsetHelper = this.getOffsetHelperContract(signerOrProvider);
    return await offsetHelper.calculateExpectedPoolTokenForETH(
      this.getPoolAddress(pool),
      amount
    );
  };

  // --------------------------------------------------------------------------------
  //  Internal methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description gets the contract of a pool token based on the symbol
   * @param pool The pool symbol of the pool (token) to use
   * @returns a ethers.contract to interact with the pool
   */
  public getPoolAddress = (pool: PoolSymbol): string => {
    return pool == "BCT" ? this.addresses.bct : this.addresses.nct;
  };

  /**
   *
   * @dev
   * @description gets the contract of a pool token based on the symbol
   * @param PoolSymbol symbol of the pool (token) to use
   * @param signerOrProvider depending on what you intend to do with the contract, a signer or provider
   * @returns a ethers.contract to interact with the pool
   */
  public getPoolContract = (
    pool: PoolSymbol,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): IToucanPoolToken => {
    const poolContract = new ethers.Contract(
      this.getPoolAddress(pool),
      poolTokenABI,
      signerOrProvider
    ) as IToucanPoolToken;

    return poolContract;
  };

  /**
   *
   * @description gets the contract of a TCO2 token based on the address
   * @param address address of TCO2 ethers.Contract to insantiate
   * @param signerOrProvider depending on what you intend to do with the contract, a signer or provider
   * @returns a ethers.contract to interact with the token
   */
  getTCO2Contract = (
    address: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): ToucanCarbonOffsets => {
    if (!this.checkIfTCO2(address, signerOrProvider))
      throw new Error(`${address} is not a TCO2 address`);

    const TCO2 = new ethers.Contract(
      address,
      tco2ABI,
      signerOrProvider
    ) as ToucanCarbonOffsets;
    return TCO2;
  };

  /**
   *
   * @description gets the contract of a the Toucan contract registry
   * @param signerOrProvider depending on what you intend to do with the contract, a signer or provider
   * @returns a ethers.contract to interact with the contract registry
   */
  public getRegistryContract = (
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): ToucanContractRegistry => {
    const toucanContractRegistry = new ethers.Contract(
      this.addresses.toucanContractRegistry,
      toucanContractRegistryABI,
      signerOrProvider
    ) as ToucanContractRegistry;
    return toucanContractRegistry;
  };

  /**
   *
   * @description gets the contract of a the OffsetHelper contract
   * @param signerOrProvider depending on what you intend to do with the contract, a signer or provider
   * @returns a ethers.contract to interact with the OffsetHelper
   */
  public getOffsetHelperContract = (
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ): OffsetHelper => {
    const OffsetHelper = new ethers.Contract(
      this.addresses.offsetHelper,
      offsetHelperABI,
      signerOrProvider
    ) as OffsetHelper;
    return OffsetHelper;
  };
}

export default ContractInteractions;
