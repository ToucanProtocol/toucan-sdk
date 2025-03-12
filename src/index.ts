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

import "isomorphic-unfetch";

import { BigNumber, ContractReceipt, ethers } from "ethers";

import ContractInteractions from "./subclasses/ContractInteractions";
import SubgraphInteractions from "./subclasses/SubgraphInteractions";
import { IToucanPoolToken } from "./typechain/legacy";
import { OffsetHelper } from "./typechain/misc";
import {
  ToucanCarbonOffsets,
  ToucanContractRegistry,
} from "./typechain/protocol";
import { ERC20__factory } from "./typechain/protocol/factories/@openzeppelin/contracts/token/ERC20/ERC20__factory";
import { PoolSymbol } from "./types";
import {
  AggregationsMethod,
  AllTCO2TokensMethod,
  BridgedBatchTokensMethod,
  CustomQueryMethod,
  PoolContentsMethod,
  ProjectByIdMethod,
  RedeemsMethod,
  TCO2TokenByFullSymbolMethod,
  TCO2TokenByIdMethod,
  UserBatchesMethod,
  UserRedeemsMethod,
  UserRetirementsMethod,
} from "./types/methods";
import { RedeemAutoResponse } from "./types/responses";

export * from "./types/responses";

/**
 *
 * @class ContractInteractions
 * @description This class wraps around classes that help users to interact with Toucan infrastructure
 * @implements ContractInteractions, SubgraphInteractions
 */
export default class ToucanClient {
  network: string;
  signerOrProvider: ethers.Signer | ethers.providers.Provider;
  contractInteractions: ContractInteractions;
  subgraphInteractions: SubgraphInteractions;

  /**
   * @param network network that you want to work on
   * @param signerOrProvider to be able to interact with the blockchain
   */
  constructor(
    network: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ) {
    this.network = network;
    this.signerOrProvider = signerOrProvider;

    this.contractInteractions = new ContractInteractions(network);
    this.subgraphInteractions = new SubgraphInteractions(network);

    // TODO: Need to validate that network matches the signerOrProvider
    // This can only be done in an async context as it invloves getting the chainId
    // from the provider so we need to have an init function that we enforce
    // users to call before using the SDK.
  }

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  TCO2 related functions
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description retires/burns an amount of TCO2s (each represents 1 ton of CO2) to achieve offset
   * @param amount The amount of TCO2 to retire
   * @param tco2Address address of the TCO2 token to retire* @returns retirement transaction
   */
  retire = async (
    amount: BigNumber,
    tco2Address: string
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.retire(amount, tco2Address, signer);
  };

  /**
   *
   * @description retires/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction
   * @param retirementEntityName name of the entity that does the retirement (you)
   * @param beneficiaryAddress address of the beneficiary (in case you're retiring for someone else)
   * @param beneficiaryName name of the beneficiary
   * @param retirementMessage retirement message
   * @param amount The amount of TCO2 to retire
   * @param tco2Address address of the TCO2 token to retire* @returns retirement transaction
   */
  retireAndMintCertificate = async (
    retirementEntityName: string,
    beneficiaryAddress: string,
    beneficiaryName: string,
    retirementMessage: string,
    amount: BigNumber,
    tco2Address: string
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.retireAndMintCertificate(
      retirementEntityName,
      beneficiaryAddress,
      beneficiaryName,
      retirementMessage,
      amount,
      tco2Address,
      signer
    );
  };

  /**
   *
   * @description retires/burns an amount of TCO2s from a different address/wallet
   * @notice requires approval from the address you're trying to retire from
   * @param amount The amount of TCO2 to retire
   * @param address address of the account to retire from
   * @param tco2Address address of the TCO2 token to retire* @returns retirement transaction
   */
  retireFrom = async (
    amount: BigNumber,
    address: string,
    tco2Address: string
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.retireFrom(
      amount,
      address,
      tco2Address,
      signer
    );
  };

  /**
   *
   * @description gets the cap for TCO2s based on `totalVintageQuantity`
   * @param tco2Address address of the TCO2 token
   * @returns
   */
  getDepositCap = async (tco2Address: string): Promise<BigNumber> => {
    return this.contractInteractions.getDepositCap(
      tco2Address,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description gets the attributes of the project represented by the TCO2
   * @param tco2Address address of the TCO2 token
   * @returns an array of attributes
   */
  getAttributes = async (tco2Address: string) => {
    return this.contractInteractions.getAttributes(
      tco2Address,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description gets the remaining space in TCO2 contract before hitting the cap
   * @param tco2Address address of the TCO2 token
   * @returns BigNumber representing the remaining space
   */
  getTCO2Remaining = async (tco2Address: string): Promise<BigNumber> => {
    return this.contractInteractions.getTCO2Remaining(
      tco2Address,
      this.signerOrProvider
    );
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
   * @param tco2Address address of the TCO2 token to deposit* @returns deposit transaction
   */
  depositTCO2 = async (
    pool: PoolSymbol,
    amount: BigNumber,
    tco2Address: string
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.depositTCO2(
      pool,
      amount,
      tco2Address,
      signer
    );
  };

  /**
   *
   * @description checks if TCO2 is eligible for pool
   * @param pool The pool symbol of the pool (token) to use
   * @param tco2 address of TCO2 to deposit
   * @returns boolean
   */
  checkEligible = async (pool: PoolSymbol, tco2: string): Promise<boolean> => {
    return this.contractInteractions.checkEligible(
      pool,
      tco2,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description calculates the fees to selectively redeem pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @returns amount of fees it will cost to redeem.
   */
  calculateRedeemFees = async (
    pool: PoolSymbol,
    tco2s: string[],
    amounts: BigNumber[]
  ): Promise<BigNumber> => {
    return this.contractInteractions.calculateRedeemFees(
      pool,
      tco2s,
      amounts,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description selectively redeems pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @returns redeem transaction
   */
  redeemMany = async (
    pool: PoolSymbol,
    tco2s: string[],
    amounts: BigNumber[]
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.redeemMany(pool, tco2s, amounts, signer);
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns redeem transaction
   */
  redeemAuto = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<RedeemAutoResponse> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.redeemAuto(pool, amount, signer);
  };

  /**
   *
   * @deprecated This function is deprecated. Please use `redeemAuto` instead.
   * @description automatically redeems pool tokens for TCO2s
   * @param pool The pool symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns array containing tco2 addresses (string) and amounts (BigNumber)
   */
  redeemAuto2 = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<RedeemAutoResponse> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.redeemAuto2(pool, amount, signer);
  };

  /**
   *
   * @description gets the remaining space in pool contract before hitting the cap
   * @param PoolSymbol symbol of the token to use
   * @returns BigNumber representing the remaining space
   */
  getPoolRemaining = async (pool: PoolSymbol): Promise<BigNumber> => {
    return this.contractInteractions.getPoolRemaining(
      pool,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description gets an array of scored TCO2s; scoredTCO2s[0] is lowest ranked
   * @param pool The pool symbol of the pool (token) to use
   * @returns array of TCO2 addresses by rank
   */
  getScoredTCO2s = async (pool: PoolSymbol): Promise<string[]> => {
    return this.contractInteractions.getScoredTCO2s(
      pool,
      this.signerOrProvider
    );
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
   * @returns boolean
   */
  checkIfTCO2 = async (address: string): Promise<boolean> => {
    return this.contractInteractions.checkIfTCO2(
      address,
      this.signerOrProvider
    );
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
   * @notice This method may take up to 1 minute to return a result
   * @param pool The pool symbol of the pool token to offset,
   * e.g., NCT
   * @param amount The amount of of TCO2 to offset.
   * @returns The offset transaction.
   */
  autoOffsetPoolToken = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.autoOffsetPoolToken(pool, amount, signer);
  };

  /**
   *
   * @description retires a specified amount of  carbon credits using the lowest
   * quality (oldest) TCO2 tokens available from the specified Toucan token pool by sending ERC20
   * tokens (cUSD, USDC, WETH, WMATIC).
   * @notice this method needs two different actions signed and may take up to 1 minute to return a result
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of CO2 tons to offset
   * @returns The offset transaction.
   */
  autoOffsetExactOutToken = async (
    swapToken: string,
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    const token = ERC20__factory.connect(swapToken, signer);

    return this.contractInteractions.autoOffsetExactOutToken(
      token,
      pool,
      amount,
      signer
    );
  };

  /**
   *
   * @description retires carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending ERC20
   * tokens (cUSD, USDC, WETH, WMATIC). All provided tokens are consumed for offsetting.
   * @notice this method needs two different actions signed and may take up to 1 minute to return a result
   * @dev When automatically redeeming pool tokens for the oldest ones
   * TCO2s there are no fees and you receive exactly 1 TCO2 token for 1 pool
   * token.
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @param pool The pool symbol of the pool (token) to use
   * @param amount the amount of ERC20 token to swap into Toucan pool token. Full amount will be used for offsetting.
   * @returns The offset transaction.
   */
  autoOffsetExactInToken = async (
    swapToken: string,
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    const token = ERC20__factory.connect(swapToken, signer);

    return this.contractInteractions.autoOffsetExactInToken(
      token,
      pool,
      amount,
      signer
    );
  };

  /**
   *
   * @description retires a specified amount of  carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending a native token e.g. MATIC.
   * @dev Use `calculateNeededETHAmount()` first in order to find out how much  of the native token e.g. MATIC is required to retire the specified quantity of TCO2. If the user sends much native token e.g. MATIC, the leftover amount will be sent back to the user.
   * @notice This method may take up to 1 minute to return a result
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of CO2 tons to offset
   * @returns The offset transaction.
   */
  autoOffsetExactOutETH = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    if (this.network === "celo")
      throw new Error("The function is not available on Celo.");
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.autoOffsetExactOutETH(
      pool,
      amount,
      signer
    );
  };
  /**
   *
   * @description Swaps ETH for carbon pool tokens and uses them to retire carbon
   * @notice This method may take up to 1 minute to return a result
   * @param pool The pool symbol of the pool (token) to use e.g., "NCT"
   * @param amount the amount of native tokens e.g., MATIC to swap into Toucan pool token. Full amount will be used for offsetting.
   * @returns The offset transaction.
   */
  autoOffsetExactInETH = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    if (this.network === "celo")
      throw new Error("The function is not available on Celo.");
    if (!(this.signerOrProvider instanceof ethers.Signer)) {
      throw new Error("signerOrProvider is not a signer");
    }
    const signer = this.signerOrProvider as ethers.Signer;

    return this.contractInteractions.autoOffsetExactInETH(pool, amount, signer);
  };

  /**
   *
   * @description Calculates how much of the specified ERC20 token is required in
   * order to swap for the desired amount of a Toucan pool token, for
   * example, e.g., NCT.
   * @param swapToken The ERC20 token used for the swap
   * @param pool The pool symbol of the pool token to swap for,
   * e.g., NCT
   * @param amount The desired amount of pool token to receive
   * @returns amount  of the ERC20 token required in order to
   * swap for the specified amount of the pool token.
   */
  calculateNeededTokenAmount = async (
    swapToken: string,
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<BigNumber> => {
    const token = ERC20__factory.connect(swapToken, this.signerOrProvider);

    return this.contractInteractions.calculateNeededTokenAmount(
      token,
      pool,
      amount,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description Calculates the amount of native tokens e.g, MATIC is required in order to swap for the
   * desired amount of a Toucan pool token, e.g., NCT.
   * @param pool The pool symbol of the pool token to swap for,
   * e.g., NCT
   * @param amount The desired amount of pool token to receive
   * @returns amount of native tokens, e.g., MATIC required in order to swap for
   * the specified amount of the pool token.
   */
  calculateNeededETHAmount = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<BigNumber> => {
    if (this.network === "celo")
      throw new Error("The function is not available on Celo.");

    return this.contractInteractions.calculateNeededETHAmount(
      pool,
      amount,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description Calculates the expected amount of Toucan Pool token that can be
   * acquired by swapping the provided amount of ERC20 token.
   *
   * @param swapToken The ERC20 token used for the swap
   * @param pool The pool symbol of the pool token to swap for,
   * e.g., NCT
   * @param amount The amount of ERC20 token to swap
   * @returns amount  The expected amount of Pool token that can be acquired.
   */
  calculateExpectedPoolTokenForToken = async (
    swapToken: string,
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<BigNumber> => {
    const token = ERC20__factory.connect(swapToken, this.signerOrProvider);

    return this.contractInteractions.calculateExpectedPoolTokenForToken(
      token,
      pool,
      amount,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description Calculates the expected amount of Toucan Pool token that can be
   * acquired by swapping the provided amount of native tokens e.g., MATIC.
   * @param pool The pool symbol of the pool (token) to use
   * @param amount The amount of native tokens  to swap for,
   * e.g., MATIC
   * @returns amount   The expected amount of Pool token that can be acquired.
   */
  calculateExpectedPoolTokenForETH = async (
    pool: PoolSymbol,
    amount: BigNumber
  ): Promise<BigNumber> => {
    if (this.network === "celo")
      throw new Error("The function is not available on Celo.");

    return this.contractInteractions.calculateExpectedPoolTokenForETH(
      pool,
      amount,
      this.signerOrProvider
    );
  };

  // --------------------------------------------------------------------------------
  //  Batches Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches the batches of a user
   * @param walletAddress address of user to query for
   * @returns an array of BatchTokens (they contain different properties of the Batch)
   */
  fetchUserBatches: UserBatchesMethod = async (walletAddress) => {
    return this.subgraphInteractions.fetchUserBatches(walletAddress);
  };

  // --------------------------------------------------------------------------------
  //  TCO2Tokens Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches properties of a TCO2
   * @param id id of the TCO2 to query for; the id happens to be the same as the address e.g.: "0x004090eef602e024b2a6cb7f0c1edda992382994"
   * @returns a TCO2Detail object with properties of the TCO2 (name, address, etc)
   */
  fetchTCO2TokenById: TCO2TokenByIdMethod = async (id) => {
    return this.subgraphInteractions.fetchTCO2TokenById(id);
  };

  /**
   *
   * @description fetches properties of a TCO2
   * @param symbol full symbol of the TCO2 to query for e.g.: "TCO2-VCS-1718-2013"
   * @returns a TCO2Detail object with properties of the TCO2 (name, address, etc)
   */
  fetchTCO2TokenByFullSymbol: TCO2TokenByFullSymbolMethod = async (
    symbol: string
  ) => {
    return this.subgraphInteractions.fetchTCO2TokenByFullSymbol(symbol);
  };

  /**
   *
   * @description fetches TCO2Details of all TCO2s
   * @returns an array of TCO2Detail objects with properties of the TCO2s (name, address, etc)
   */
  fetchAllTCO2Tokens: AllTCO2TokensMethod = async () => {
    return this.subgraphInteractions.fetchAllTCO2Tokens();
  };

  // --------------------------------------------------------------------------------
  //  BatchTokens Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches data about BatchTokens that have been bridged
   * @returns an array of BatchTokens containing different properties like id, serialNumber or quantity
   */
  fetchBridgedBatchTokens: BridgedBatchTokensMethod = async () => {
    return this.subgraphInteractions.fetchBridgedBatchTokens();
  };

  // --------------------------------------------------------------------------------
  //  Retirements Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches retirements made by a user
   * @param walletAddress address of the user/wallet to query for
   * @param first how many retirements you want fetched; defaults to 100
   * @param skip how many (if any) retirements you want skipped; defaults to 0
   * @returns an array of objects containing properties of the retirements like id, creationTx, amount and more
   */
  fetchUserRetirements: UserRetirementsMethod = async (
    walletAddress,
    first = 100,
    skip = 0
  ) => {
    return this.subgraphInteractions.fetchUserRetirements(
      walletAddress,
      first,
      skip
    );
  };

  // --------------------------------------------------------------------------------
  //  Redeems Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches redeems of a given pool
   * @param pool The pool symbol of pool to fetch for
   * @param first how many redeems you want fetched; defaults to 100
   * @param skip how many (if any) redeems you want skipped; defaults to 0
   * @returns an array of objects with properties of the redeems like id, amount, timestamp and more
   */
  fetchRedeems: RedeemsMethod = async (pool, first = 100, skip = 0) => {
    return this.subgraphInteractions.fetchRedeems(pool, first, skip);
  };

  /**
   *
   * @description fetches redeems of a given pool and user
   * @param walletAddress address of the user/wallet to query for
   * @param pool The pool symbol of pool to fetch for
   * @param first how many redeems you want fetched; defaults to 100
   * @param skip how many (if any) redeems you want skipped; defaults to 0
   * @returns an array of objects with properties of the redeems like id, amount, timestamp and more
   */
  fetchUserRedeems: UserRedeemsMethod = async (
    walletAddress,
    pool,
    first = 100,
    skip = 0
  ) => {
    return this.subgraphInteractions.fetchUserRedeems(
      walletAddress,
      pool,
      first,
      skip
    );
  };

  // --------------------------------------------------------------------------------
  //  PooledTCO2Tokens Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches TCO2 tokens that are part of the given pool
   * @param pool The pool symbol of the pool to fetch for
   * @param first how many TCO2 tokens you want fetched; defaults to 1000
   * @param skip how many (if any) retirements you want skipped; defaults to 0
   * @returns an array of objects representing TCO2 tokens and containing properties like name, amount, methodology and more
   */
  fetchPoolContents: PoolContentsMethod = async (
    pool,
    first = 1000,
    skip = 0
  ) => {
    return this.subgraphInteractions.fetchPoolContents(pool, first, skip);
  };

  // --------------------------------------------------------------------------------
  //  Projects Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches a project by its id
   * @param id id of the project to fetch; e.g.: "10"
   * @returns an object with properties of the Project like projectId, region, standard and more
   */
  fetchProjectById: ProjectByIdMethod = async (id) => {
    return this.subgraphInteractions.fetchProjectById(id);
  };

  // --------------------------------------------------------------------------------
  //  Aggregations Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetch all aggregations (including, for example, tco2TotalRetired or totalCarbonBridged)
   * @returns an array of Aggregation objects containing properties like id, key, value
   */
  fetchAggregations: AggregationsMethod = async () => {
    return this.subgraphInteractions.fetchAggregations();
  };

  // --------------------------------------------------------------------------------
  //  Other Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description if pre-made queries to Toucan's Subgraph don't fit all your needs; use this for custom queries
   * @param query a gql formated GraphQL query
   * @param params any parameters you may want to pass to the query
   * @returns all data fetched from query; you can use generics to declare what type to expect (if you're a fan of TS)
   */
  fetchCustomQuery: CustomQueryMethod = async (query, params) => {
    return this.subgraphInteractions.fetchCustomQuery(query, params);
  };

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  Price / Sushiswap related functions
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  // FIXME: The SushiSwap and Ubeswap Subgraph APIs that are used to get token
  // market prices have changed slightly. This function breaks currently. Work
  // on it is tracked in LILA-7487.
  fetchTokenPriceOnDex = async (
    pool: PoolSymbol
  ): Promise<{
    price: number | null;
    url: string | null;
    liquidityUSD: number | null;
    volumeUSD: number | null;
  }> => {
    return this.subgraphInteractions.fetchTokenPriceOnDex(pool);
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
    return this.contractInteractions.getPoolAddress(pool);
  };

  /**
   *
   * @dev
   * @description gets the contract of a pool token based on the symbol
   * @param PoolSymbol symbol of the pool (token) to use
   * @returns a ethers.contract to interact with the pool
   */
  public getPoolContract = (pool: PoolSymbol): IToucanPoolToken => {
    return this.contractInteractions.getPoolContract(
      pool,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description gets the contract of a TCO2 token based on the address
   * @param address address of TCO2 ethers.Contract to insantiate
   * @returns a ethers.contract to interact with the token
   */
  getTCO2Contract = (address: string): ToucanCarbonOffsets => {
    return this.contractInteractions.getTCO2Contract(
      address,
      this.signerOrProvider
    );
  };

  /**
   *
   * @description gets the contract of a the Toucan contract registry
   * @returns a ethers.contract to interact with the contract registry
   */
  public getRegistryContract = (): ToucanContractRegistry => {
    return this.contractInteractions.getRegistryContract(this.signerOrProvider);
  };

  /**
   *
   * @description gets the contract of a the OffsetHelper contract
   * @returns a ethers.contract to interact with the OffsetHelper
   */
  public getOffsetHelperContract = (): OffsetHelper => {
    return this.contractInteractions.getOffsetHelperContract(
      this.signerOrProvider
    );
  };
}

export * from "./types/responses";
