/**
  The OffsetHelper's purpose is to simplify the carbon offsetting process.
  Copyright (C) 2022  Toucan Labs

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
} from "../typechain";
import { Network, PoolSymbol } from "../types";
import { GAS_LIMIT } from "../utils";
import {
  poolTokenABI,
  tco2ABI,
  toucanContractRegistryABI,
} from "../utils/ABIs";
import addresses, { IfcOneNetworksAddresses } from "../utils/addresses";

/**
 * @class ContractInteractions
 * @description This class helps interact with Toucan contracts
 */
class ContractInteractions {
  network: Network;
  addresses: IfcOneNetworksAddresses;

  /**
   *
   * @param network network that you want to work on
   */
  constructor(network: Network) {
    this.network = network;
    this.addresses = addresses[this.network];
  }

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  TCO2 related methods
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description retires/burns an amount of TCO2s (each represents 1 ton of CO2) to achieve offset
   * @param amount amount of TCO2 to retire
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
   * @description retires/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction
   * @param retirementEntityName name of the entity that does the retirement (you)
   * @param beneficiaryAddress address of the beneficiary (in case you're retiring for someone else)
   * @param beneficiaryName name of the beneficiary
   * @param retirementMessage retirement message
   * @param amount amount of TCO2 to retire
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
  //  Pool related methods
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description deposits TCO2s in the pool which mints a pool token for the user
   * @param pool symbol of the pool (token) to use
   * @param amount amount of TCO2s to deposit
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
      amount,
      { gasLimit: GAS_LIMIT }
    );
    return await depositTxn.wait();
  };

  /**
   *
   * @description checks if TCO2 is eligible for pool
   * @param pool symbol of the pool (token) to use
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
   * @param pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @returns amount (BigNumber) of fees it will cost to redeem
   */

  /**
   *
   * @description calculates the fees to selectively redeem pool tokens for TCO2s
   * @param pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount (BigNumber) of fees it will cost to redeem
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
   * @param pool symbol of the pool (token) to use
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
      amounts,
      { gasLimit: GAS_LIMIT }
    );
    return await redeemTxn.wait();
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @param pool symbol of the pool (token) to use
   * @param amount amount to redeem
   * @param signer this being a write transaction, we need a signer
   * @returns redeem transaction
   */
  redeemAuto = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool, signer);

    const redeemTxn: ContractTransaction = await poolToken.redeemAuto(amount, {
      gasLimit: GAS_LIMIT,
    });
    return await redeemTxn.wait();
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @param pool symbol of the pool (token) to use
   * @param amount amount to redeem
   * @param signer this being a write transaction, we need a signer
   * @returns array containing tco2 addresses (string) and amounts (BigNumber)
   */
  redeemAuto2 = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<{ address: string; amount: BigNumber }[]> => {
    const poolToken = this.getPoolContract(pool, signer);
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
   * @param pool symbol of the pool (token) to use
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
  //  Contract registry related methods
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
  //  OffsetHelper related methods
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description allows user to retire carbon using carbon pool tokens from his wallet
   * @notice this method may take up to even 1 minute to give a result
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetUsingPoolToken = async (
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
      await offsetHelper.autoOffsetUsingPoolToken(this.addresses.nct, amount, {
        gasLimit: GAS_LIMIT,
      });
    return await offsetTxn.wait();
  };

  /**
   *
   * @description swaps given token for carbon pool tokens and uses them to retire carbon
   * @notice this method may take up to even 1 minute to give a result
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetUsingSwapToken = async (
    pool: PoolSymbol,
    amount: BigNumber,
    swapToken: Contract,
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
      await offsetHelper.autoOffsetUsingToken(
        swapToken.address,
        poolAddress,
        amount,
        { gasLimit: GAS_LIMIT }
      );
    return await offsetTxn.wait();
  };

  /**
   *
   * @description swaps ETH for carbon pool tokens and uses them to retire carbon
   * @notice this method may take up to even 1 minute to give a result
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @param signer this being a write transaction, we need a signer
   * @returns offset transaction
   */
  autoOffsetUsingETH = async (
    pool: PoolSymbol,
    amount: BigNumber,
    signer: ethers.Signer
  ): Promise<ContractReceipt> => {
    const offsetHelper = this.getOffsetHelperContract(signer);
    const poolAddress = this.getPoolAddress(pool);

    const offsetTxn: ContractTransaction =
      await offsetHelper.autoOffsetUsingETH(poolAddress, amount, {
        gasLimit: GAS_LIMIT,
        value: await offsetHelper.calculateNeededETHAmount(poolAddress, amount),
      });
    return await offsetTxn.wait();
  };

  /**
   *
   * @description calculates the needed amount of tokens to send to offset
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @param swapToken contract of the token to use in swap
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount (BigNumber) of swapToken needed to deposit
   */
  calculateNeededTokenAmount = async (
    pool: PoolSymbol,
    amount: BigNumber,
    swapToken: Contract,
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
   * @description calculates the needed amount of ETH to send to offset; ETH = native currency of network you are on
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @param signerOrProvider this being a read transaction, we need a signer or provider
   * @returns amount (BigNumber) of ETH needed to deposit; ETH = native currency of network you are on
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

  // --------------------------------------------------------------------------------
  //  Internal methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description gets the contract of a pool token based on the symbol
   * @param pool symbol of the pool (token) to use
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
  ): IToucanCarbonOffsets => {
    if (!this.checkIfTCO2(address, signerOrProvider))
      throw new Error(`${address} is not a TCO2 address`);

    const TCO2 = new ethers.Contract(
      address,
      tco2ABI,
      signerOrProvider
    ) as IToucanCarbonOffsets;
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
  ): IToucanContractRegistry => {
    const toucanContractRegistry = new ethers.Contract(
      this.addresses.toucanContractRegistry,
      toucanContractRegistryABI,
      signerOrProvider
    ) as IToucanContractRegistry;
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
    throw new Error("OffsetHelper is not supported yet");
  };
}

export default ContractInteractions;
