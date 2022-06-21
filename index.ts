import "isomorphic-unfetch";

import { Client, createClient, gql } from "@urql/core";
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
import { Network, poolSymbol } from "./types";
import {
  fetchAggregationsMethod,
  fetchAllTCO2TokensMethod,
  fetchBridgedBatchTokensMethod,
  fetchBridgedBatchTokensResult,
  fetchCustomQueryMethod,
  fetchPoolContentsMethod,
  fetchProjectByIdMethod,
  fetchRedeemsMethod,
  fetchTCO2TokenByFullSymbolMethod,
  fetchTCO2TokenByIdMethod,
  fetchTCO2TokenResult,
  fetchUserBatchesMethod,
  fetchUserRedeemsMethod,
  fetchUserRetirementsMethod,
} from "./types/methods";
import { PairSchema } from "./types/schemas";
import { GAS_LIMIT } from "./utils";
import {
  offsetHelperABI,
  poolTokenABI,
  tco2ABI,
  toucanContractRegistryABI,
} from "./utils/ABIs";
import addresses, { IfcOneNetworksAddresses } from "./utils/addresses";
import { MUMBAI_GRAPH_API_URL, POLYGON_GRAPH_API_URL } from "./utils/graphAPIs";
import {
  getSushiGraphClient,
  getToucanGraphClient,
} from "./utils/graphClients";

export class ContractInteractions {
  provider: ethers.providers.Provider;
  signer: ethers.Wallet | ethers.Signer;
  network: Network;
  addresses: IfcOneNetworksAddresses;
  offsetHelper: OffsetHelper;
  bct: IToucanPoolToken;
  nct: IToucanPoolToken;
  ToucanContractRegistry: IToucanContractRegistry;
  TCO2: IToucanCarbonOffsets | undefined;
  graphClient: Client;

  /**
   *
   * @param network network that you want to work on
   * @param provider web3 or jsonRpc provider
   * @param signer signer
   */
  constructor(
    network: Network,
    provider: ethers.providers.Provider,
    signer: ethers.Wallet | ethers.Signer
  ) {
    this.network = network;
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

    this.graphClient = getToucanGraphClient(network);
  }

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  TCO2 related methods
  // --------------------------------------------------------------------------------
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
  // --------------------------------------------------------------------------------
  //  Pool related methods
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  /**
   *
   * @description deposits TCO2s in the pool which mints a pool token for the user
   * @param pool symbol of the pool (token) to use
   * @param amount amount of TCO2s to deposit
   * @param tco2 contract of TCO2 to deposit
   * @returns deposit transaction
   */
  depositTCO2 = async (
    pool: poolSymbol,
    amount: BigNumber,
    tco2: IToucanCarbonOffsets
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool);

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
   * @param pool symbol of the pool (token) to use
   * @param tco2 address of TCO2 to deposit
   * @returns boolean
   */
  checkEligible = async (pool: poolSymbol, tco2: string): Promise<boolean> => {
    const poolToken = this.getPoolContract(pool);
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
  calculateRedeemFees = async (
    pool: poolSymbol,
    tco2s: string[],
    amounts: BigNumber[]
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(pool);
    return await poolToken.calculateRedeemFees(tco2s, amounts);
  };

  /**
   *
   * @description selectively redeems pool tokens for TCO2s
   * @param pool symbol of the pool (token) to use
   * @param tco2s array of TCO2 contract addresses
   * @param amounts array of amounts to redeem for each tco2s
   * @notice tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for
   * @returns redeem transaction
   */
  redeemMany = async (
    pool: poolSymbol,
    tco2s: string[],
    amounts: BigNumber[]
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool);

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
   * @returns redeem transaction
   */
  redeemAuto = async (
    pool: poolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool);

    const redeemTxn: ContractTransaction = await poolToken.redeemAuto(amount, {
      gasLimit: GAS_LIMIT,
    });
    return await redeemTxn.wait();
  };

  /**
   *
   * @description automatically redeems pool tokens for TCO2s
   * @notice costs more gas than redeemAuto()
   * @param pool symbol of the pool (token) to use
   * @param amount amount to redeem
   * @returns array containing tco2 addresses (string) and amounts (BigNumber)
   */
  redeemAuto2 = async (
    pool: poolSymbol,
    amount: BigNumber
  ): Promise<{ address: string; amount: BigNumber }[]> => {
    const poolToken = this.getPoolContract(pool);
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
   * @param pool symbol of the pool (token) to use
   * @returns array of TCO2 addresses by rank
   */
  getScoredTCO2s = async (pool: poolSymbol): Promise<string[]> => {
    const poolToken = this.getPoolContract(pool);
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
   * @returns boolean
   */
  checkIfTCO2 = async (address: string): Promise<boolean> => {
    return await this.ToucanContractRegistry.checkERC20(address);
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
   * @returns offset transaction
   */
  autoOffsetUsingPoolToken = async (
    pool: poolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool);

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
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @param swapToken portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)
   * @returns offset transaction
   */
  autoOffsetUsingSwapToken = async (
    pool: poolSymbol,
    amount: BigNumber,
    swapToken: Contract
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool);

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
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to offset
   * @returns offset transaction
   */
  autoOffsetUsingETH = async (
    pool: poolSymbol,
    amount: BigNumber
  ): Promise<ContractReceipt> => {
    const poolToken = this.getPoolContract(pool);

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
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @param swapToken contract of the token to use in swap
   * @returns amount (BigNumber) of swapToken needed to deposit
   */
  calculateNeededTokenAmount = async (
    pool: poolSymbol,
    amount: BigNumber,
    swapToken: Contract
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(pool);
    return await this.offsetHelper.calculateNeededTokenAmount(
      swapToken.address,
      poolToken.address,
      amount
    );
  };

  /**
   *
   * @description calculates the needed amount of ETH to send to offset; ETH = native currency of network you are on
   * @param pool symbol of the pool (token) to use
   * @param amount amount of CO2 tons to calculate for
   * @returns amount (BigNumber) of ETH needed to deposit; ETH = native currency of network you are on
   */
  calculateNeededETHAmount = async (
    pool: poolSymbol,
    amount: BigNumber
  ): Promise<BigNumber> => {
    const poolToken = this.getPoolContract(pool);
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
   * @param pool symbol of the pool (token) to use
   * @returns a ethers.contract to interact with the pool
   */
  private getPoolContract = (pool: poolSymbol): IToucanPoolToken => {
    return pool == "BCT" ? this.bct : this.nct;
  };
}

export class SubgraphInteractions {
  network: Network;
  addresses: IfcOneNetworksAddresses;
  TCO2: IToucanCarbonOffsets | undefined;
  graphClient: Client;

  /**
   *
   * @param network network that you want to work on
   */
  constructor(network: Network) {
    this.network = network;

    this.addresses =
      this.network == "polygon" ? addresses.polygon : addresses.mumbai;

    this.graphClient = getToucanGraphClient(network);
  }

  /**
   *
   * Note: It's very important that whenever you change the gql query of any existent
   * methods, you also change the return type of the method (in types/methods.ts) to
   * match it.
   *
   */

  // --------------------------------------------------------------------------------
  //  Batches Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches the batches of a user
   * @param walletAddress address of user to query for
   * @returns an array of BatchTokens (they contain different properties of the Batch)
   */
  fetchUserBatches: fetchUserBatchesMethod = async (walletAddress) => {
    const query = gql`
      query ($walletAddress: String) {
        users(id: $walletAddress) {
          batchesOwned(orderBy: id, orderDirection: desc) {
            id
            tx
            serialNumber
            quantity
            confirmationStatus
            comments {
              id
              comment
              sender {
                id
              }
            }
            creator {
              id
            }
          }
        }
      }
    `;

    const result = await this.graphClient
      .query(query, { walletAddress: walletAddress })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data?.users[0]?.batchesOwned)
      return result.data.users[0].batchesOwned;
    return [];
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
  fetchTCO2TokenById: fetchTCO2TokenByIdMethod = async (id) => {
    const query = gql`
      query ($id: String) {
        tco2Token(id: $id) {
          id
          name
          symbol
          address
          projectVintage {
            name
            project {
              projectId
            }
          }
        }
      }
    `;

    const result = await this.graphClient.query(query, { id: id }).toPromise();

    if (result.error) throw result.error;
    if (result.data?.tco2Tokens) return result.data.tco2Tokens;
    return;
  };

  /**
   *
   * @description fetches properties of a TCO2
   * @param symbol full symbol of the TCO2 to query for e.g.: "TCO2-VCS-1718-2013"
   * @returns a TCO2Detail object with properties of the TCO2 (name, address, etc)
   */
  fetchTCO2TokenByFullSymbol: fetchTCO2TokenByFullSymbolMethod = async (
    symbol: string
  ) => {
    const query = gql`
      query ($symbol: String) {
        tco2Tokens(where: { symbol: $symbol }) {
          id
          name
          symbol
          address
          projectVintage {
            name
            project {
              projectId
            }
          }
        }
      }
    `;

    const result = await this.graphClient
      .query(query, { symbol: symbol })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data?.tco2Tokens[0]) return result.data.tco2Tokens[0];
    return;
  };

  /**
   *
   * @description fetches TCO2Details of all TCO2s
   * @returns an array of TCO2Detail objects with properties of the TCO2s (name, address, etc)
   */
  fetchAllTCO2Tokens: fetchAllTCO2TokensMethod = async () => {
    let TCO2Tokens: fetchTCO2TokenResult[] = [];
    let skip = 0;
    const first = 1000;
    for (;;) {
      const query = gql`
        query ($first: Int, $skip: Int) {
          tco2Tokens(first: $first, skip: $skip) {
            name
            symbol
            address
            projectVintage {
              name
              project {
                projectId
              }
            }
          }
        }
      `;
      const result = await this.graphClient
        .query(query, { first: first, skip: skip })
        .toPromise();

      if (result.error) throw result.error;

      if (result.data?.tco2Tokens) {
        TCO2Tokens = TCO2Tokens.concat(result.data.tco2Tokens);
        if (result.data.tco2Tokens.length === first) {
          skip += first;
          continue;
        }
      }
      break;
    }

    return TCO2Tokens;
  };

  // --------------------------------------------------------------------------------
  //  BatchTokens Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches data about BatchTokens that have been bridged
   * @returns an array of BatchTokens containing different properties like id, serialNumber or quantity
   */
  fetchBridgedBatchTokens: fetchBridgedBatchTokensMethod = async () => {
    let BridgedBatchTokens: fetchBridgedBatchTokensResult[] = [];
    let skip = 0;
    const first = 1000;
    for (;;) {
      const query = gql`
        query ($retirementStatus: Int, $first: Int, $skip: Int) {
          batchTokens(
            where: { confirmationStatus: $retirementStatus }
            orderBy: timestamp
            first: $first
            skip: $skip
          ) {
            id
            serialNumber
            quantity
            creator {
              id
            }
            timestamp
            tx
          }
        }
      `;

      const result = await this.graphClient
        .query(query, {
          retirementStatus: 2, // RetirementStatus.Confirmed = 2
          first: first,
          skip: skip,
        })
        .toPromise();

      if (result.error) throw result.error;

      if (result.data?.batchTokens) {
        BridgedBatchTokens = BridgedBatchTokens.concat(result.data.batchTokens);
        if (result.data.batchTokens.length === first) {
          skip += first;
          continue;
        }
      }
      break;
    }

    return BridgedBatchTokens;
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
  fetchUserRetirements: fetchUserRetirementsMethod = async (
    walletAddress,
    first = 100,
    skip = 0
  ) => {
    const query = gql`
      query ($walletAddress: String, $first: Int, $skip: Int) {
        user(id: $walletAddress) {
          retirementsCreated(
            first: $first
            skip: $skip
            orderBy: timestamp
            orderDirection: desc
          ) {
            id
            creationTx
            amount
            timestamp
            token {
              symbol
              name
              address
              projectVintage {
                name
                project {
                  projectId
                }
              }
            }
            certificate {
              id
              retiringEntity {
                id
              }
              beneficiary {
                id
              }
              retiringEntityString
              beneficiaryString
              retirementMessage
              createdAt
            }
          }
        }
      }
    `;

    const result = await this.graphClient
      .query(query, { walletAddress: walletAddress, first: first, skip: skip })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data?.user?.retirementsCreated)
      return result.data.user.retirementsCreated;
    return [];
  };

  // --------------------------------------------------------------------------------
  //  Redeems Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches redeems of a given pool
   * @param pool symbol of pool to fetch for
   * @param first how many redeems you want fetched; defaults to 100
   * @param skip how many (if any) redeems you want skipped; defaults to 0
   * @returns an array of objects with properties of the redeems like id, amount, timestamp and more
   */
  fetchRedeems: fetchRedeemsMethod = async (pool, first = 100, skip = 0) => {
    const poolAddress = this.getPoolAddress(pool);

    const query = gql`
      query ($poolAddress: String, $first: Int, $skip: Int) {
        redeems(
          where: { pool: $poolAddress }
          first: $first
          skip: $skip
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          amount
          timestamp
          creator {
            id
          }
          token {
            symbol
            name
            address
            projectVintage {
              name
              project {
                projectId
              }
            }
          }
        }
      }
    `;

    const result = await this.graphClient
      .query(query, { poolAddress: poolAddress, first: first, skip: skip })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data?.redeems) return result.data.redeems;
    return [];
  };

  /**
   *
   * @description fetches redeems of a given pool and user
   * @param walletAddress address of the user/wallet to query for
   * @param pool symbol of pool to fetch for
   * @param first how many redeems you want fetched; defaults to 100
   * @param skip how many (if any) redeems you want skipped; defaults to 0
   * @returns an array of objects with properties of the redeems like id, amount, timestamp and more
   */
  fetchUserRedeems: fetchUserRedeemsMethod = async (
    walletAddress,
    pool,
    first = 100,
    skip = 0
  ) => {
    const poolAddress = this.getPoolAddress(pool);

    const query = gql`
      query (
        $walletAddress: String
        $poolAddress: String
        $first: Int
        $skip: Int
      ) {
        user(id: $walletAddress) {
          redeemsCreated(
            where: { pool: $poolAddress }
            first: $first
            skip: $skip
            orderBy: timestamp
            orderDirection: desc
          ) {
            id
            amount
            timestamp
            creator {
              id
            }
            token {
              symbol
              name
              address
              projectVintage {
                name
                project {
                  projectId
                }
              }
            }
          }
        }
      }
    `;

    const result = await this.graphClient
      .query(query, {
        walletAddress: walletAddress,
        poolAddress: poolAddress,
        first: first,
        skip: skip,
      })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data?.user?.redeemsCreated)
      return result.data.user.redeemsCreated;
    return [];
  };

  // --------------------------------------------------------------------------------
  //  PooledTCO2Tokens Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetches TCO2 tokens that are part of the given pool
   * @param pool symbol of the pool to fetch for
   * @param first how many TCO2 tokens you want fetched; defaults to 1000
   * @param skip how many (if any) retirements you want skipped; defaults to 0
   * @returns an array of objects representing TCO2 tokens and containing properties like name, amount, methodology and more
   */
  fetchPoolContents: fetchPoolContentsMethod = async (
    pool,
    first = 1000,
    skip = 0
  ) => {
    const poolAddress = this.getPoolAddress(pool);

    const query = gql`
      query ($poolAddress: String, $first: Int, $skip: Int) {
        pooledTCO2Tokens(
          where: { poolAddress: $poolAddress }
          first: $first
          skip: $skip
          orderBy: amount
          orderDirection: desc
        ) {
          token {
            name
            projectVintage {
              id
              project {
                methodology
                standard
              }
            }
          }
          amount
        }
      }
    `;

    const result = await this.graphClient
      .query(query, {
        poolAddress: poolAddress,
        first: first,
        skip: skip,
      })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data?.pooledTCO2Tokens) return result.data.pooledTCO2Tokens;
    return [];
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
  fetchProjectById: fetchProjectByIdMethod = async (id) => {
    const query = gql`
      query ($id: String) {
        project(id: $id) {
          projectId
          region
          standard
          methodology
          vintages {
            id
          }
        }
      }
    `;

    const result = await this.graphClient.query(query, { id: id }).toPromise();

    if (result.error) throw result.error;
    if (result.data?.project) return result.data.project;
    return;
  };

  // --------------------------------------------------------------------------------
  //  Aggregations Subgraph Methods
  // --------------------------------------------------------------------------------

  /**
   *
   * @description fetch all aggregations (including, for example, tco2TotalRetired or totalCarbonBridged)
   * @returns an array of Aggregation objects containing properties like id, key, value
   */
  fetchAggregations: fetchAggregationsMethod = async () => {
    const query = gql`
      {
        aggregations {
          id
          key
          value
        }
      }
    `;

    const result = await this.graphClient.query(query).toPromise();

    if (result.error) throw result.error;
    if (result.data?.aggregations) return result.data.aggregations;
    return [];
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
  fetchCustomQuery: fetchCustomQueryMethod = async (query, params) => {
    const result = await this.graphClient
      .query(query, {
        ...(params ?? {}),
      })
      .toPromise();

    if (result.error) throw result.error;
    if (result.data) return result.data;
    return;
  };

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  //  Price / Sushiswap related methods
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  private extractPriceInUSD = (
    pairs0: PairSchema[],
    pairs1: PairSchema[]
  ): number => {
    if (pairs0 && pairs0.length > 0) {
      for (const pair of pairs0) {
        if (pair.token1.symbol === "USDC") {
          return parseFloat(pair.token1Price);
        }
      }
    }
    if (pairs1 && pairs1.length > 0) {
      for (const pair of pairs1) {
        if (pair.token0.symbol === "USDC") {
          return parseFloat(pair.token0Price);
        }
      }
    }
    return 0;
  };

  private fetchTokenPrice = async (tokenAddress: string): Promise<number[]> => {
    const SushiGraphClient = getSushiGraphClient();

    const senderQuery = gql`
      query tokenPairsQuery($id: String!, $skip: Int, $block: Block_height) {
        pairs0: pairs(
          first: 1000
          skip: $skip
          orderBy: reserveUSD
          orderDirection: desc
          token0: $id
          block: $block
          orderBy: reserveUSD
          orderDirection: desc
        ) {
          ...pairFields
        }
        pairs1: pairs(
          first: 1000
          skip: $skip
          orderBy: reserveUSD
          orderDirection: desc
          token1: $id
          block: $block
          orderBy: reserveUSD
          orderDirection: desc
        ) {
          ...pairFields
        }
      }

      fragment pairFields on Pair {
        id
        reserveUSD
        reserveETH
        volumeUSD
        untrackedVolumeUSD
        trackedReserveETH
        token0 {
          ...PairToken
        }
        token1 {
          ...PairToken
        }
        reserve0
        reserve1
        token0Price
        token1Price
        totalSupply
        txCount
        timestamp
      }

      fragment PairToken on Token {
        id
        name
        symbol
        totalSupply
        derivedETH
      }
    `;

    const result = await SushiGraphClient.query(senderQuery, {
      id: tokenAddress,
    }).toPromise();

    if (result.error) throw result.error;

    const priceInUSD = this.extractPriceInUSD(
      result.data?.pairs0,
      result.data?.pairs1
    );

    const liquidityUSD =
      result.data?.pairs0?.reduce((acc: number, item: PairSchema) => {
        acc += parseFloat(item.reserveUSD);
        return acc;
      }, 0) +
      result.data?.pairs1?.reduce((acc: number, item: PairSchema) => {
        acc += parseFloat(item.reserveUSD);
        return acc;
      }, 0);

    const volumeUSD =
      result.data?.pairs0?.reduce((acc: number, item: PairSchema) => {
        acc += parseFloat(item.volumeUSD);
        return acc;
      }, 0) +
      result.data?.pairs1?.reduce((acc: number, item: PairSchema) => {
        acc += parseFloat(item.volumeUSD);
        return acc;
      }, 0);
    return [priceInUSD, liquidityUSD, volumeUSD];
  };

  fetchTokenPriceOnSushiSwap = async (
    pool: poolSymbol
  ): Promise<{
    price: number | null;
    url: string | null;
    liquidityUSD: number | null;
    volumeUSD: number | null;
  }> => {
    const tokenAddress = this.getPoolAddress(pool);
    let url = null;
    const [price, liquidityUSD, volumeUSD] = await this.fetchTokenPrice(
      tokenAddress
    );
    if (!price) throw new Error(`No price found for ${pool}`);
    url = `https://app.sushi.com/analytics/tokens/${tokenAddress}`;
    return { price, url, liquidityUSD, volumeUSD };
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
  private getPoolAddress = (pool: poolSymbol): string => {
    return pool == "BCT" ? this.addresses.bct : this.addresses.nct;
  };
}
