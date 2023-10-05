[toucan-sdk](../README.md) / [Exports](../modules.md) / default

# Class: default

**`Description`**

This class wraps around classes that help users to interact with Toucan infrastructure

**`Implements`**

ContractInteractions, SubgraphInteractions

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [contractInteractions](default.md#contractinteractions)
- [fetchAggregations](default.md#fetchaggregations)
- [fetchAllTCO2Tokens](default.md#fetchalltco2tokens)
- [fetchBridgedBatchTokens](default.md#fetchbridgedbatchtokens)
- [fetchCustomQuery](default.md#fetchcustomquery)
- [fetchPoolContents](default.md#fetchpoolcontents)
- [fetchProjectById](default.md#fetchprojectbyid)
- [fetchRedeems](default.md#fetchredeems)
- [fetchTCO2TokenByFullSymbol](default.md#fetchtco2tokenbyfullsymbol)
- [fetchTCO2TokenById](default.md#fetchtco2tokenbyid)
- [fetchUserBatches](default.md#fetchuserbatches)
- [fetchUserRedeems](default.md#fetchuserredeems)
- [fetchUserRetirements](default.md#fetchuserretirements)
- [network](default.md#network)
- [provider](default.md#provider)
- [signer](default.md#signer)
- [subgraphInteractions](default.md#subgraphinteractions)

### Methods

- [autoOffsetExactInETH](default.md#autooffsetexactineth)
- [autoOffsetExactInToken](default.md#autooffsetexactintoken)
- [autoOffsetExactOutETH](default.md#autooffsetexactouteth)
- [autoOffsetExactOutToken](default.md#autooffsetexactouttoken)
- [autoOffsetPoolToken](default.md#autooffsetpooltoken)
- [calculateExpectedPoolTokenForETH](default.md#calculateexpectedpooltokenforeth)
- [calculateExpectedPoolTokenForToken](default.md#calculateexpectedpooltokenfortoken)
- [calculateNeededETHAmount](default.md#calculateneededethamount)
- [calculateNeededTokenAmount](default.md#calculateneededtokenamount)
- [calculateRedeemFees](default.md#calculateredeemfees)
- [checkEligible](default.md#checkeligible)
- [checkIfTCO2](default.md#checkiftco2)
- [depositTCO2](default.md#deposittco2)
- [fetchTokenPriceOnDex](default.md#fetchtokenpriceondex)
- [getAttributes](default.md#getattributes)
- [getDepositCap](default.md#getdepositcap)
- [getOffsetHelperContract](default.md#getoffsethelpercontract)
- [getPoolAddress](default.md#getpooladdress)
- [getPoolContract](default.md#getpoolcontract)
- [getPoolRemaining](default.md#getpoolremaining)
- [getRegistryContract](default.md#getregistrycontract)
- [getScoredTCO2s](default.md#getscoredtco2s)
- [getTCO2Contract](default.md#gettco2contract)
- [getTCO2Remaining](default.md#gettco2remaining)
- [redeemAuto](default.md#redeemauto)
- [redeemAuto2](default.md#redeemauto2)
- [redeemMany](default.md#redeemmany)
- [retire](default.md#retire)
- [retireAndMintCertificate](default.md#retireandmintcertificate)
- [retireFrom](default.md#retirefrom)
- [setProvider](default.md#setprovider)
- [setSigner](default.md#setsigner)

## Constructors

### constructor

• **new default**(`network`, `provider?`, `signer?`)

#### Parameters

| Name        | Type       | Description                            |
| :---------- | :--------- | :------------------------------------- |
| `network`   | `Network`  | network that you want to work on       |
| `provider?` | `Provider` | to be able to read from the blockchain |
| `signer?`   | `Signer`   | to be able to sign transactions        |

#### Defined in

[index.ts:69](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L69)

## Properties

### contractInteractions

• **contractInteractions**: `ContractInteractions`

#### Defined in

[index.ts:60](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L60)

---

### fetchAggregations

• **fetchAggregations**: `AggregationsMethod`

**`Description`**

fetch all aggregations (including, for example, tco2TotalRetired or totalCarbonBridged)

#### Defined in

[index.ts:805](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L805)

---

### fetchAllTCO2Tokens

• **fetchAllTCO2Tokens**: `AllTCO2TokensMethod`

**`Description`**

fetches TCO2Details of all TCO2s

#### Defined in

[index.ts:682](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L682)

---

### fetchBridgedBatchTokens

• **fetchBridgedBatchTokens**: `BridgedBatchTokensMethod`

**`Description`**

fetches data about BatchTokens that have been bridged

#### Defined in

[index.ts:695](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L695)

---

### fetchCustomQuery

• **fetchCustomQuery**: `CustomQueryMethod`

**`Description`**

if pre-made queries to Toucan's Subgraph don't fit all your needs; use this for custom queries

**`Param`**

a gql formated GraphQL query

**`Param`**

any parameters you may want to pass to the query

#### Defined in

[index.ts:820](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L820)

---

### fetchPoolContents

• **fetchPoolContents**: `PoolContentsMethod`

**`Description`**

fetches TCO2 tokens that are part of the given pool

**`Param`**

The pool symbol of the pool to fetch for

**`Param`**

how many TCO2 tokens you want fetched; defaults to 1000

**`Param`**

how many (if any) retirements you want skipped; defaults to 0

#### Defined in

[index.ts:774](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L774)

---

### fetchProjectById

• **fetchProjectById**: `ProjectByIdMethod`

**`Description`**

fetches a project by its id

**`Param`**

id of the project to fetch; e.g.: "10"

#### Defined in

[index.ts:792](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L792)

---

### fetchRedeems

• **fetchRedeems**: `RedeemsMethod`

**`Description`**

fetches redeems of a given pool

**`Param`**

The pool symbol of pool to fetch for

**`Param`**

how many redeems you want fetched; defaults to 100

**`Param`**

how many (if any) redeems you want skipped; defaults to 0

#### Defined in

[index.ts:735](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L735)

---

### fetchTCO2TokenByFullSymbol

• **fetchTCO2TokenByFullSymbol**: `TCO2TokenByFullSymbolMethod`

**`Description`**

fetches properties of a TCO2

**`Param`**

full symbol of the TCO2 to query for e.g.: "TCO2-VCS-1718-2013"

#### Defined in

[index.ts:671](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L671)

---

### fetchTCO2TokenById

• **fetchTCO2TokenById**: `TCO2TokenByIdMethod`

**`Description`**

fetches properties of a TCO2

**`Param`**

id of the TCO2 to query for; the id happens to be the same as the address e.g.: "0x004090eef602e024b2a6cb7f0c1edda992382994"

#### Defined in

[index.ts:661](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L661)

---

### fetchUserBatches

• **fetchUserBatches**: `UserBatchesMethod`

**`Description`**

fetches the batches of a user

**`Param`**

address of user to query for

#### Defined in

[index.ts:647](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L647)

---

### fetchUserRedeems

• **fetchUserRedeems**: `UserRedeemsMethod`

**`Description`**

fetches redeems of a given pool and user

**`Param`**

address of the user/wallet to query for

**`Param`**

The pool symbol of pool to fetch for

**`Param`**

how many redeems you want fetched; defaults to 100

**`Param`**

how many (if any) redeems you want skipped; defaults to 0

#### Defined in

[index.ts:748](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L748)

---

### fetchUserRetirements

• **fetchUserRetirements**: `UserRetirementsMethod`

**`Description`**

fetches retirements made by a user

**`Param`**

address of the user/wallet to query for

**`Param`**

how many retirements you want fetched; defaults to 100

**`Param`**

how many (if any) retirements you want skipped; defaults to 0

#### Defined in

[index.ts:711](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L711)

---

### network

• **network**: `Network`

#### Defined in

[index.ts:59](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L59)

---

### provider

• **provider**: `undefined` \| `Provider`

#### Defined in

[index.ts:58](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L58)

---

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[index.ts:57](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L57)

---

### subgraphInteractions

• **subgraphInteractions**: `SubgraphInteractions`

#### Defined in

[index.ts:61](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L61)

## Methods

### autoOffsetExactInETH

▸ **autoOffsetExactInETH**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name     | Type         | Description                                                                                                      |
| :------- | :----------- | :--------------------------------------------------------------------------------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool (token) to use e.g., "NCT"                                                           |
| `amount` | `BigNumber`  | the amount of native tokens e.g., MATIC to swap into Toucan pool token. Full amount will be used for offsetting. |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

Swaps ETH for carbon pool tokens and uses them to retire carbon

**`Notice`**

This method may take up to 1 minute to return a result

#### Defined in

[index.ts:511](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L511)

---

### autoOffsetExactInToken

▸ **autoOffsetExactInToken**(`swapToken`, `pool`, `amount`): `Promise`<`ContractReceipt`\>

/\*\*

-
-

#### Parameters

| Name        | Type         | Description                                                                                           |
| :---------- | :----------- | :---------------------------------------------------------------------------------------------------- |
| `swapToken` | `string`     | portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC) \*                 |
| `pool`      | `PoolSymbol` | The pool symbol of the pool (token) to use \*                                                         |
| `amount`    | `BigNumber`  | the amount of ERC20 token to swap into Toucan pool token. Full amount will be used for offsetting. \* |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending ERC20

- tokens (cUSD, USDC, WETH, WMATIC). All provided tokens are consumed for offsetting.
-

**`Notice`**

this method needs two different actions signed and may take up to 1 minute to return a result

-

**`Dev`**

When automatically redeeming pool tokens for the oldest ones

- TCO2s there are no fees and you receive exactly 1 TCO2 token for 1 pool
- token.
-

#### Defined in

[index.ts:459](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L459)

---

### autoOffsetExactOutETH

▸ **autoOffsetExactOutETH**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name     | Type         | Description                                |
| :------- | :----------- | :----------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber`  | The amount of CO2 tons to offset           |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires a specified amount of carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending a native token e.g. MATIC.

**`Dev`**

Use `calculateNeededETHAmount()` first in order to find out how much of the native token e.g. MATIC is required to retire the specified quantity of TCO2. If the user sends much native token e.g. MATIC, the leftover amount will be sent back to the user.

**`Notice`**

This method may take up to 1 minute to return a result

#### Defined in

[index.ts:488](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L488)

---

### autoOffsetExactOutToken

▸ **autoOffsetExactOutToken**(`swapToken`, `pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name        | Type         | Description                                                                        |
| :---------- | :----------- | :--------------------------------------------------------------------------------- |
| `swapToken` | `string`     | portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC) |
| `pool`      | `PoolSymbol` | The pool symbol of the pool (token) to use                                         |
| `amount`    | `BigNumber`  | The amount of CO2 tons to offset                                                   |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires a specified amount of carbon credits using the lowest
quality (oldest) TCO2 tokens available from the specified Toucan token pool by sending ERC20
tokens (cUSD, USDC, WETH, WMATIC).

**`Notice`**

this method needs two different actions signed and may take up to 1 minute to return a result

#### Defined in

[index.ts:424](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L424)

---

### autoOffsetPoolToken

▸ **autoOffsetPoolToken**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name     | Type         | Description                                            |
| :------- | :----------- | :----------------------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool token to offset, e.g., NCT |
| `amount` | `BigNumber`  | The amount of of TCO2 to offset.                       |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires carbon credits using the oldest TCO2
tokens available by sending pool tokens, e.g., NCT.

**`Notice`**

This method may take up to 1 minute to return a result

#### Defined in

[index.ts:402](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L402)

---

### calculateExpectedPoolTokenForETH

▸ **calculateExpectedPoolTokenForETH**(`pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name     | Type         | Description                                          |
| :------- | :----------- | :--------------------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool (token) to use           |
| `amount` | `BigNumber`  | The amount of native tokens to swap for, e.g., MATIC |

#### Returns

`Promise`<`BigNumber`\>

amount The expected amount of Pool token that can be acquired.

**`Description`**

Calculates the expected amount of Toucan Pool token that can be
acquired by swapping the provided amount of native tokens e.g., MATIC.

#### Defined in

[index.ts:621](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L621)

---

### calculateExpectedPoolTokenForToken

▸ **calculateExpectedPoolTokenForToken**(`swapToken`, `pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name        | Type         | Description                                              |
| :---------- | :----------- | :------------------------------------------------------- |
| `swapToken` | `string`     | The ERC20 token used for the swap                        |
| `pool`      | `PoolSymbol` | The pool symbol of the pool token to swap for, e.g., NCT |
| `amount`    | `BigNumber`  | The amount of ERC20 token to swap                        |

#### Returns

`Promise`<`BigNumber`\>

amount The expected amount of Pool token that can be acquired.

**`Description`**

Calculates the expected amount of Toucan Pool token that can be
acquired by swapping the provided amount of ERC20 token.

#### Defined in

[index.ts:592](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L592)

---

### calculateNeededETHAmount

▸ **calculateNeededETHAmount**(`pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name     | Type         | Description                                              |
| :------- | :----------- | :------------------------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool token to swap for, e.g., NCT |
| `amount` | `BigNumber`  | The desired amount of pool token to receive              |

#### Returns

`Promise`<`BigNumber`\>

amount of native tokens, e.g., MATIC required in order to swap for
the specified amount of the pool token.

**`Description`**

Calculates the amount of native tokens e.g, MATIC is required in order to swap for the
desired amount of a Toucan pool token, e.g., NCT.

#### Defined in

[index.ts:565](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L565)

---

### calculateNeededTokenAmount

▸ **calculateNeededTokenAmount**(`swapToken`, `pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name        | Type         | Description                                              |
| :---------- | :----------- | :------------------------------------------------------- |
| `swapToken` | `string`     | The ERC20 token used for the swap                        |
| `pool`      | `PoolSymbol` | The pool symbol of the pool token to swap for, e.g., NCT |
| `amount`    | `BigNumber`  | The desired amount of pool token to receive              |

#### Returns

`Promise`<`BigNumber`\>

amount of the ERC20 token required in order to
swap for the specified amount of the pool token.

**`Description`**

Calculates how much of the specified ERC20 token is required in
order to swap for the desired amount of a Toucan pool token, for
example, e.g., NCT.

#### Defined in

[index.ts:535](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L535)

---

### calculateRedeemFees

▸ **calculateRedeemFees**(`pool`, `tco2s`, `amounts`): `Promise`<`BigNumber`\>

#### Parameters

| Name      | Type          | Description                                |
| :-------- | :------------ | :----------------------------------------- |
| `pool`    | `PoolSymbol`  | The pool symbol of the pool (token) to use |
| `tco2s`   | `string`[]    | array of TCO2 contract addresses           |
| `amounts` | `BigNumber`[] | array of amounts to redeem for each tco2s  |

#### Returns

`Promise`<`BigNumber`\>

amount of fees it will cost to redeem.

**`Description`**

calculates the fees to selectively redeem pool tokens for TCO2s

**`Notice`**

tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for

#### Defined in

[index.ts:272](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L272)

---

### checkEligible

▸ **checkEligible**(`pool`, `tco2`): `Promise`<`boolean`\>

#### Parameters

| Name   | Type         | Description                                |
| :----- | :----------- | :----------------------------------------- |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `tco2` | `string`     | address of TCO2 to deposit                 |

#### Returns

`Promise`<`boolean`\>

boolean

**`Description`**

checks if TCO2 is eligible for pool

#### Defined in

[index.ts:252](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L252)

---

### checkIfTCO2

▸ **checkIfTCO2**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `address` | `string` | address of contract to check |

#### Returns

`Promise`<`boolean`\>

boolean

**`Description`**

checks if an address represents a TCO2

#### Defined in

[index.ts:379](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L379)

---

### depositTCO2

▸ **depositTCO2**(`pool`, `amount`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name          | Type         | Description                                |
| :------------ | :----------- | :----------------------------------------- |
| `pool`        | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount`      | `BigNumber`  | The amount of TCO2s to deposit             |
| `tco2Address` | `string`     | address of the TCO2 token to deposit\*     |

#### Returns

`Promise`<`ContractReceipt`\>

deposit transaction

**`Description`**

deposits TCO2s in the pool which mints a pool token for the user

#### Defined in

[index.ts:229](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L229)

---

### fetchTokenPriceOnDex

▸ **fetchTokenPriceOnDex**(`pool`): `Promise`<{ `liquidityUSD`: `null` \| `number` ; `price`: `null` \| `number` ; `url`: `null` \| `string` ; `volumeUSD`: `null` \| `number` }\>

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `pool` | `PoolSymbol` |

#### Returns

`Promise`<{ `liquidityUSD`: `null` \| `number` ; `price`: `null` \| `number` ; `url`: `null` \| `string` ; `volumeUSD`: `null` \| `number` }\>

#### Defined in

[index.ts:830](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L830)

---

### getAttributes

▸ **getAttributes**(`tco2Address`): `Promise`<[[`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`] & { `category`: `string` ; `controller`: `string` ; `emissionType`: `string` ; `method`: `string` ; `methodology`: `string` ; `projectId`: `string` ; `region`: `string` ; `standard`: `string` ; `storageMethod`: `string` ; `uri`: `string` }, [`string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `boolean`, `boolean`, `string`, `string`, `string`, `string`] & { `additionalCertification`: `string` ; `coBenefits`: `string` ; `correspAdjustment`: `string` ; `endTime`: `BigNumber` ; `isCCPcompliant`: `boolean` ; `isCorsiaCompliant`: `boolean` ; `name`: `string` ; `projectTokenId`: `BigNumber` ; `startTime`: `BigNumber` ; `totalVintageQuantity`: `BigNumber` ; `uri`: `string` }]\>

#### Parameters

| Name          | Type     | Description               |
| :------------ | :------- | :------------------------ |
| `tco2Address` | `string` | address of the TCO2 token |

#### Returns

`Promise`<[[`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`] & { `category`: `string` ; `controller`: `string` ; `emissionType`: `string` ; `method`: `string` ; `methodology`: `string` ; `projectId`: `string` ; `region`: `string` ; `standard`: `string` ; `storageMethod`: `string` ; `uri`: `string` }, [`string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `boolean`, `boolean`, `string`, `string`, `string`, `string`] & { `additionalCertification`: `string` ; `coBenefits`: `string` ; `correspAdjustment`: `string` ; `endTime`: `BigNumber` ; `isCCPcompliant`: `boolean` ; `isCorsiaCompliant`: `boolean` ; `name`: `string` ; `projectTokenId`: `BigNumber` ; `startTime`: `BigNumber` ; `totalVintageQuantity`: `BigNumber` ; `uri`: `string` }]\>

an array of attributes

**`Description`**

gets the attributes of the project represented by the TCO2

#### Defined in

[index.ts:190](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L190)

---

### getDepositCap

▸ **getDepositCap**(`tco2Address`): `Promise`<`BigNumber`\>

#### Parameters

| Name          | Type     | Description               |
| :------------ | :------- | :------------------------ |
| `tco2Address` | `string` | address of the TCO2 token |

#### Returns

`Promise`<`BigNumber`\>

**`Description`**

gets the cap for TCO2s based on `totalVintageQuantity`

#### Defined in

[index.ts:174](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L174)

---

### getOffsetHelperContract

▸ **getOffsetHelperContract**(): `OffsetHelper`

#### Returns

`OffsetHelper`

a ethers.contract to interact with the OffsetHelper

**`Description`**

gets the contract of a the OffsetHelper contract

#### Defined in

[index.ts:899](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L899)

---

### getPoolAddress

▸ **getPoolAddress**(`pool`): `string`

#### Parameters

| Name   | Type         | Description                                |
| :----- | :----------- | :----------------------------------------- |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |

#### Returns

`string`

a ethers.contract to interact with the pool

**`Description`**

gets the contract of a pool token based on the symbol

#### Defined in

[index.ts:851](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L851)

---

### getPoolContract

▸ **getPoolContract**(`pool`): `IToucanPoolToken`

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `pool` | `PoolSymbol` |

#### Returns

`IToucanPoolToken`

a ethers.contract to interact with the pool

**`Dev`**

**`Description`**

gets the contract of a pool token based on the symbol

#### Defined in

[index.ts:862](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L862)

---

### getPoolRemaining

▸ **getPoolRemaining**(`pool`): `Promise`<`BigNumber`\>

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `pool` | `PoolSymbol` |

#### Returns

`Promise`<`BigNumber`\>

BigNumber representing the remaining space

**`Description`**

gets the remaining space in pool contract before hitting the cap

#### Defined in

[index.ts:347](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L347)

---

### getRegistryContract

▸ **getRegistryContract**(): `IToucanContractRegistry`

#### Returns

`IToucanContractRegistry`

a ethers.contract to interact with the contract registry

**`Description`**

gets the contract of a the Toucan contract registry

#### Defined in

[index.ts:887](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L887)

---

### getScoredTCO2s

▸ **getScoredTCO2s**(`pool`): `Promise`<`string`[]\>

#### Parameters

| Name   | Type         | Description                                |
| :----- | :----------- | :----------------------------------------- |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |

#### Returns

`Promise`<`string`[]\>

array of TCO2 addresses by rank

**`Description`**

gets an array of scored TCO2s; scoredTCO2s[0] is lowest ranked

#### Defined in

[index.ts:360](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L360)

---

### getTCO2Contract

▸ **getTCO2Contract**(`address`): `IToucanCarbonOffsets`

#### Parameters

| Name      | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `address` | `string` | address of TCO2 ethers.Contract to insantiate |

#### Returns

`IToucanCarbonOffsets`

a ethers.contract to interact with the token

**`Description`**

gets the contract of a TCO2 token based on the address

#### Defined in

[index.ts:875](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L875)

---

### getTCO2Remaining

▸ **getTCO2Remaining**(`tco2Address`): `Promise`<`BigNumber`\>

#### Parameters

| Name          | Type     | Description               |
| :------------ | :------- | :------------------------ |
| `tco2Address` | `string` | address of the TCO2 token |

#### Returns

`Promise`<`BigNumber`\>

BigNumber representing the remaining space

**`Description`**

gets the remaining space in TCO2 contract before hitting the cap

#### Defined in

[index.ts:206](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L206)

---

### redeemAuto

▸ **redeemAuto**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name     | Type         | Description                                |
| :------- | :----------- | :----------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber`  | amount to redeem                           |

#### Returns

`Promise`<`ContractReceipt`\>

redeem transaction

**`Description`**

automatically redeems pool tokens for TCO2s

#### Defined in

[index.ts:314](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L314)

---

### redeemAuto2

▸ **redeemAuto2**(`pool`, `amount`): `Promise`<{ `address`: `string` ; `amount`: `BigNumber` }[]\>

#### Parameters

| Name     | Type         | Description                                |
| :------- | :----------- | :----------------------------------------- |
| `pool`   | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber`  | amount to redeem                           |

#### Returns

`Promise`<{ `address`: `string` ; `amount`: `BigNumber` }[]\>

array containing tco2 addresses (string) and amounts (BigNumber)

**`Description`**

automatically redeems pool tokens for TCO2s

#### Defined in

[index.ts:331](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L331)

---

### redeemMany

▸ **redeemMany**(`pool`, `tco2s`, `amounts`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name      | Type          | Description                                |
| :-------- | :------------ | :----------------------------------------- |
| `pool`    | `PoolSymbol`  | The pool symbol of the pool (token) to use |
| `tco2s`   | `string`[]    | array of TCO2 contract addresses           |
| `amounts` | `BigNumber`[] | array of amounts to redeem for each tco2s  |

#### Returns

`Promise`<`ContractReceipt`\>

redeem transaction

**`Description`**

selectively redeems pool tokens for TCO2s

#### Defined in

[index.ts:296](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L296)

---

### retire

▸ **retire**(`amount`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name          | Type        | Description                           |
| :------------ | :---------- | :------------------------------------ |
| `amount`      | `BigNumber` | The amount of TCO2 to retire          |
| `tco2Address` | `string`    | address of the TCO2 token to retire\* |

#### Returns

`Promise`<`ContractReceipt`\>

retirement transaction

**`Description`**

retires/burns an amount of TCO2s (each represents 1 ton of CO2) to achieve offset

#### Defined in

[index.ts:102](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L102)

---

### retireAndMintCertificate

▸ **retireAndMintCertificate**(`retirementEntityName`, `beneficiaryAddress`, `beneficiaryName`, `retirementMessage`, `amount`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name                   | Type        | Description                                                           |
| :--------------------- | :---------- | :-------------------------------------------------------------------- |
| `retirementEntityName` | `string`    | name of the entity that does the retirement (you)                     |
| `beneficiaryAddress`   | `string`    | address of the beneficiary (in case you're retiring for someone else) |
| `beneficiaryName`      | `string`    | name of the beneficiary                                               |
| `retirementMessage`    | `string`    | retirement message                                                    |
| `amount`               | `BigNumber` | The amount of TCO2 to retire                                          |
| `tco2Address`          | `string`    | address of the TCO2 token to retire\*                                 |

#### Returns

`Promise`<`ContractReceipt`\>

retirement transaction

**`Description`**

retires/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction

#### Defined in

[index.ts:122](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L122)

---

### retireFrom

▸ **retireFrom**(`amount`, `address`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name          | Type        | Description                           |
| :------------ | :---------- | :------------------------------------ |
| `amount`      | `BigNumber` | The amount of TCO2 to retire          |
| `address`     | `string`    | address of the account to retire from |
| `tco2Address` | `string`    | address of the TCO2 token to retire\* |

#### Returns

`Promise`<`ContractReceipt`\>

retirement transaction

**`Description`**

retires/burns an amount of TCO2s from a different address/wallet

**`Notice`**

requires approval from the address you're trying to retire from

#### Defined in

[index.ts:152](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L152)

---

### setProvider

▸ **setProvider**(`provider`): `void`

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `provider` | `Provider` |

#### Returns

`void`

#### Defined in

[index.ts:86](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L86)

---

### setSigner

▸ **setSigner**(`signer`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `signer` | `Signer` |

#### Returns

`void`

#### Defined in

[index.ts:82](https://github.com/GigaHierz/toucan-sdk/blob/b837065/src/index.ts#L82)
