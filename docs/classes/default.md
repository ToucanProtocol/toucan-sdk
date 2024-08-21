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

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | `Network` | network that you want to work on |
| `provider?` | `Provider` | to be able to read from the blockchain |
| `signer?` | `Signer` | to be able to sign transactions |

#### Defined in

[index.ts:71](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L71)

## Properties

### contractInteractions

• **contractInteractions**: `ContractInteractions`

#### Defined in

[index.ts:62](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L62)

___

### fetchAggregations

• **fetchAggregations**: `AggregationsMethod`

**`Description`**

fetch all aggregations (including, for example, tco2TotalRetired or totalCarbonBridged)

#### Defined in

[index.ts:808](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L808)

___

### fetchAllTCO2Tokens

• **fetchAllTCO2Tokens**: `AllTCO2TokensMethod`

**`Description`**

fetches TCO2Details of all TCO2s

#### Defined in

[index.ts:685](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L685)

___

### fetchBridgedBatchTokens

• **fetchBridgedBatchTokens**: `BridgedBatchTokensMethod`

**`Description`**

fetches data about BatchTokens that have been bridged

#### Defined in

[index.ts:698](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L698)

___

### fetchCustomQuery

• **fetchCustomQuery**: `CustomQueryMethod`

**`Description`**

if pre-made queries to Toucan's Subgraph don't fit all your needs; use this for custom queries

**`Param`**

a gql formated GraphQL query

**`Param`**

any parameters you may want to pass to the query

#### Defined in

[index.ts:823](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L823)

___

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

[index.ts:777](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L777)

___

### fetchProjectById

• **fetchProjectById**: `ProjectByIdMethod`

**`Description`**

fetches a project by its id

**`Param`**

id of the project to fetch; e.g.: "10"

#### Defined in

[index.ts:795](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L795)

___

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

[index.ts:738](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L738)

___

### fetchTCO2TokenByFullSymbol

• **fetchTCO2TokenByFullSymbol**: `TCO2TokenByFullSymbolMethod`

**`Description`**

fetches properties of a TCO2

**`Param`**

full symbol of the TCO2 to query for e.g.: "TCO2-VCS-1718-2013"

#### Defined in

[index.ts:674](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L674)

___

### fetchTCO2TokenById

• **fetchTCO2TokenById**: `TCO2TokenByIdMethod`

**`Description`**

fetches properties of a TCO2

**`Param`**

id of the TCO2 to query for; the id happens to be the same as the address e.g.: "0x004090eef602e024b2a6cb7f0c1edda992382994"

#### Defined in

[index.ts:664](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L664)

___

### fetchUserBatches

• **fetchUserBatches**: `UserBatchesMethod`

**`Description`**

fetches the batches of a user

**`Param`**

address of user to query for

#### Defined in

[index.ts:650](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L650)

___

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

[index.ts:751](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L751)

___

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

[index.ts:714](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L714)

___

### network

• **network**: `Network`

#### Defined in

[index.ts:61](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L61)

___

### provider

• **provider**: `undefined` \| `Provider`

#### Defined in

[index.ts:60](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L60)

___

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[index.ts:59](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L59)

___

### subgraphInteractions

• **subgraphInteractions**: `SubgraphInteractions`

#### Defined in

[index.ts:63](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L63)

## Methods

### autoOffsetExactInETH

▸ **autoOffsetExactInETH**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use e.g., "NCT" |
| `amount` | `BigNumber` | the amount of native tokens e.g., MATIC to swap into Toucan pool token. Full amount will be used for offsetting. |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

Swaps ETH for carbon pool tokens and uses them to retire carbon

**`Notice`**

This method may take up to 1 minute to return a result

#### Defined in

[index.ts:514](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L514)

___

### autoOffsetExactInToken

▸ **autoOffsetExactInToken**(`swapToken`, `pool`, `amount`): `Promise`<`ContractReceipt`\>

/**
 *
 *

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapToken` | `string` | portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC) * |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use * |
| `amount` | `BigNumber` | the amount of ERC20 token to swap into Toucan pool token. Full amount will be used for offsetting. * |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending ERC20
   * tokens (cUSD, USDC, WETH, WMATIC). All provided tokens are consumed for offsetting.
 *

**`Notice`**

this method needs two different actions signed and may take up to 1 minute to return a result
 *

**`Dev`**

When automatically redeeming pool tokens for the oldest ones
   * TCO2s there are no fees and you receive exactly 1 TCO2 token for 1 pool
   * token.
 *

#### Defined in

[index.ts:462](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L462)

___

### autoOffsetExactOutETH

▸ **autoOffsetExactOutETH**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber` | The amount of CO2 tons to offset |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires a specified amount of  carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending a native token e.g. MATIC.

**`Dev`**

Use `calculateNeededETHAmount()` first in order to find out how much  of the native token e.g. MATIC is required to retire the specified quantity of TCO2. If the user sends much native token e.g. MATIC, the leftover amount will be sent back to the user.

**`Notice`**

This method may take up to 1 minute to return a result

#### Defined in

[index.ts:491](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L491)

___

### autoOffsetExactOutToken

▸ **autoOffsetExactOutToken**(`swapToken`, `pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapToken` | `string` | portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC) |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber` | The amount of CO2 tons to offset |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires a specified amount of  carbon credits using the lowest
quality (oldest) TCO2 tokens available from the specified Toucan token pool by sending ERC20
tokens (cUSD, USDC, WETH, WMATIC).

**`Notice`**

this method needs two different actions signed and may take up to 1 minute to return a result

#### Defined in

[index.ts:427](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L427)

___

### autoOffsetPoolToken

▸ **autoOffsetPoolToken**(`pool`, `amount`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool token to offset, e.g., NCT |
| `amount` | `BigNumber` | The amount of of TCO2 to offset. |

#### Returns

`Promise`<`ContractReceipt`\>

The offset transaction.

**`Description`**

retires carbon credits using the oldest TCO2
tokens available by sending pool tokens, e.g., NCT.

**`Notice`**

This method may take up to 1 minute to return a result

#### Defined in

[index.ts:405](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L405)

___

### calculateExpectedPoolTokenForETH

▸ **calculateExpectedPoolTokenForETH**(`pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber` | The amount of native tokens to swap for, e.g., MATIC |

#### Returns

`Promise`<`BigNumber`\>

amount   The expected amount of Pool token that can be acquired.

**`Description`**

Calculates the expected amount of Toucan Pool token that can be
acquired by swapping the provided amount of native tokens e.g., MATIC.

#### Defined in

[index.ts:624](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L624)

___

### calculateExpectedPoolTokenForToken

▸ **calculateExpectedPoolTokenForToken**(`swapToken`, `pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapToken` | `string` | The ERC20 token used for the swap |
| `pool` | `PoolSymbol` | The pool symbol of the pool token to swap for, e.g., NCT |
| `amount` | `BigNumber` | The amount of ERC20 token to swap |

#### Returns

`Promise`<`BigNumber`\>

amount  The expected amount of Pool token that can be acquired.

**`Description`**

Calculates the expected amount of Toucan Pool token that can be
acquired by swapping the provided amount of ERC20 token.

#### Defined in

[index.ts:595](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L595)

___

### calculateNeededETHAmount

▸ **calculateNeededETHAmount**(`pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool token to swap for, e.g., NCT |
| `amount` | `BigNumber` | The desired amount of pool token to receive |

#### Returns

`Promise`<`BigNumber`\>

amount of native tokens, e.g., MATIC required in order to swap for
the specified amount of the pool token.

**`Description`**

Calculates the amount of native tokens e.g, MATIC is required in order to swap for the
desired amount of a Toucan pool token, e.g., NCT.

#### Defined in

[index.ts:568](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L568)

___

### calculateNeededTokenAmount

▸ **calculateNeededTokenAmount**(`swapToken`, `pool`, `amount`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapToken` | `string` | The ERC20 token used for the swap |
| `pool` | `PoolSymbol` | The pool symbol of the pool token to swap for, e.g., NCT |
| `amount` | `BigNumber` | The desired amount of pool token to receive |

#### Returns

`Promise`<`BigNumber`\>

amount  of the ERC20 token required in order to
swap for the specified amount of the pool token.

**`Description`**

Calculates how much of the specified ERC20 token is required in
order to swap for the desired amount of a Toucan pool token, for
example, e.g., NCT.

#### Defined in

[index.ts:538](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L538)

___

### calculateRedeemFees

▸ **calculateRedeemFees**(`pool`, `tco2s`, `amounts`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `tco2s` | `string`[] | array of TCO2 contract addresses |
| `amounts` | `BigNumber`[] | array of amounts to redeem for each tco2s |

#### Returns

`Promise`<`BigNumber`\>

amount of fees it will cost to redeem.

**`Description`**

calculates the fees to selectively redeem pool tokens for TCO2s

**`Notice`**

tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for

#### Defined in

[index.ts:274](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L274)

___

### checkEligible

▸ **checkEligible**(`pool`, `tco2`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `tco2` | `string` | address of TCO2 to deposit |

#### Returns

`Promise`<`boolean`\>

boolean

**`Description`**

checks if TCO2 is eligible for pool

#### Defined in

[index.ts:254](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L254)

___

### checkIfTCO2

▸ **checkIfTCO2**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | address of contract to check |

#### Returns

`Promise`<`boolean`\>

boolean

**`Description`**

checks if an address represents a TCO2

#### Defined in

[index.ts:382](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L382)

___

### depositTCO2

▸ **depositTCO2**(`pool`, `amount`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber` | The amount of TCO2s to deposit |
| `tco2Address` | `string` | address of the TCO2 token to deposit* |

#### Returns

`Promise`<`ContractReceipt`\>

deposit transaction

**`Description`**

deposits TCO2s in the pool which mints a pool token for the user

#### Defined in

[index.ts:231](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L231)

___

### fetchTokenPriceOnDex

▸ **fetchTokenPriceOnDex**(`pool`): `Promise`<{ `liquidityUSD`: ``null`` \| `number` ; `price`: ``null`` \| `number` ; `url`: ``null`` \| `string` ; `volumeUSD`: ``null`` \| `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | `PoolSymbol` |

#### Returns

`Promise`<{ `liquidityUSD`: ``null`` \| `number` ; `price`: ``null`` \| `number` ; `url`: ``null`` \| `string` ; `volumeUSD`: ``null`` \| `number`  }\>

#### Defined in

[index.ts:836](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L836)

___

### getAttributes

▸ **getAttributes**(`tco2Address`): `Promise`<[[`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`] & { `category`: `string` ; `controller`: `string` ; `emissionType`: `string` ; `method`: `string` ; `methodology`: `string` ; `projectId`: `string` ; `region`: `string` ; `standard`: `string` ; `storageMethod`: `string` ; `uri`: `string`  }, [`string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `boolean`, `boolean`, `string`, `string`, `string`, `string`] & { `additionalCertification`: `string` ; `coBenefits`: `string` ; `correspAdjustment`: `string` ; `endTime`: `BigNumber` ; `isCCPcompliant`: `boolean` ; `isCorsiaCompliant`: `boolean` ; `name`: `string` ; `projectTokenId`: `BigNumber` ; `startTime`: `BigNumber` ; `totalVintageQuantity`: `BigNumber` ; `uri`: `string`  }]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tco2Address` | `string` | address of the TCO2 token |

#### Returns

`Promise`<[[`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`] & { `category`: `string` ; `controller`: `string` ; `emissionType`: `string` ; `method`: `string` ; `methodology`: `string` ; `projectId`: `string` ; `region`: `string` ; `standard`: `string` ; `storageMethod`: `string` ; `uri`: `string`  }, [`string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `boolean`, `boolean`, `string`, `string`, `string`, `string`] & { `additionalCertification`: `string` ; `coBenefits`: `string` ; `correspAdjustment`: `string` ; `endTime`: `BigNumber` ; `isCCPcompliant`: `boolean` ; `isCorsiaCompliant`: `boolean` ; `name`: `string` ; `projectTokenId`: `BigNumber` ; `startTime`: `BigNumber` ; `totalVintageQuantity`: `BigNumber` ; `uri`: `string`  }]\>

an array of attributes

**`Description`**

gets the attributes of the project represented by the TCO2

#### Defined in

[index.ts:192](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L192)

___

### getDepositCap

▸ **getDepositCap**(`tco2Address`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tco2Address` | `string` | address of the TCO2 token |

#### Returns

`Promise`<`BigNumber`\>

**`Description`**

gets the cap for TCO2s based on `totalVintageQuantity`

#### Defined in

[index.ts:176](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L176)

___

### getOffsetHelperContract

▸ **getOffsetHelperContract**(): `OffsetHelper`

#### Returns

`OffsetHelper`

a ethers.contract to interact with the OffsetHelper

**`Description`**

gets the contract of a the OffsetHelper contract

#### Defined in

[index.ts:905](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L905)

___

### getPoolAddress

▸ **getPoolAddress**(`pool`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |

#### Returns

`string`

a ethers.contract to interact with the pool

**`Description`**

gets the contract of a pool token based on the symbol

#### Defined in

[index.ts:857](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L857)

___

### getPoolContract

▸ **getPoolContract**(`pool`): `IToucanPoolToken`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | `PoolSymbol` |

#### Returns

`IToucanPoolToken`

a ethers.contract to interact with the pool

**`Dev`**

**`Description`**

gets the contract of a pool token based on the symbol

#### Defined in

[index.ts:868](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L868)

___

### getPoolRemaining

▸ **getPoolRemaining**(`pool`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | `PoolSymbol` |

#### Returns

`Promise`<`BigNumber`\>

BigNumber representing the remaining space

**`Description`**

gets the remaining space in pool contract before hitting the cap

#### Defined in

[index.ts:350](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L350)

___

### getRegistryContract

▸ **getRegistryContract**(): `IToucanContractRegistry`

#### Returns

`IToucanContractRegistry`

a ethers.contract to interact with the contract registry

**`Description`**

gets the contract of a the Toucan contract registry

#### Defined in

[index.ts:893](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L893)

___

### getScoredTCO2s

▸ **getScoredTCO2s**(`pool`): `Promise`<`string`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |

#### Returns

`Promise`<`string`[]\>

array of TCO2 addresses by rank

**`Description`**

gets an array of scored TCO2s; scoredTCO2s[0] is lowest ranked

#### Defined in

[index.ts:363](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L363)

___

### getTCO2Contract

▸ **getTCO2Contract**(`address`): `IToucanCarbonOffsets`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | address of TCO2 ethers.Contract to insantiate |

#### Returns

`IToucanCarbonOffsets`

a ethers.contract to interact with the token

**`Description`**

gets the contract of a TCO2 token based on the address

#### Defined in

[index.ts:881](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L881)

___

### getTCO2Remaining

▸ **getTCO2Remaining**(`tco2Address`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tco2Address` | `string` | address of the TCO2 token |

#### Returns

`Promise`<`BigNumber`\>

BigNumber representing the remaining space

**`Description`**

gets the remaining space in TCO2 contract before hitting the cap

#### Defined in

[index.ts:208](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L208)

___

### redeemAuto

▸ **redeemAuto**(`pool`, `amount`): `Promise`<[`RedeemAutoResponse`](../modules.md#redeemautoresponse)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber` | amount to redeem |

#### Returns

`Promise`<[`RedeemAutoResponse`](../modules.md#redeemautoresponse)\>

redeem transaction

**`Description`**

automatically redeems pool tokens for TCO2s

#### Defined in

[index.ts:316](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L316)

___

### redeemAuto2

▸ **redeemAuto2**(`pool`, `amount`): `Promise`<[`RedeemAutoResponse`](../modules.md#redeemautoresponse)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `amount` | `BigNumber` | amount to redeem |

#### Returns

`Promise`<[`RedeemAutoResponse`](../modules.md#redeemautoresponse)\>

array containing tco2 addresses (string) and amounts (BigNumber)

**`Deprecated`**

This function is deprecated. Please use `redeemAuto` instead.

**`Description`**

automatically redeems pool tokens for TCO2s

#### Defined in

[index.ts:334](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L334)

___

### redeemMany

▸ **redeemMany**(`pool`, `tco2s`, `amounts`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `PoolSymbol` | The pool symbol of the pool (token) to use |
| `tco2s` | `string`[] | array of TCO2 contract addresses |
| `amounts` | `BigNumber`[] | array of amounts to redeem for each tco2s |

#### Returns

`Promise`<`ContractReceipt`\>

redeem transaction

**`Description`**

selectively redeems pool tokens for TCO2s

#### Defined in

[index.ts:298](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L298)

___

### retire

▸ **retire**(`amount`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | The amount of TCO2 to retire |
| `tco2Address` | `string` | address of the TCO2 token to retire* |

#### Returns

`Promise`<`ContractReceipt`\>

retirement transaction

**`Description`**

retires/burns an amount of TCO2s (each represents 1 ton of CO2) to achieve offset

#### Defined in

[index.ts:104](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L104)

___

### retireAndMintCertificate

▸ **retireAndMintCertificate**(`retirementEntityName`, `beneficiaryAddress`, `beneficiaryName`, `retirementMessage`, `amount`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `retirementEntityName` | `string` | name of the entity that does the retirement (you) |
| `beneficiaryAddress` | `string` | address of the beneficiary (in case you're retiring for someone else) |
| `beneficiaryName` | `string` | name of the beneficiary |
| `retirementMessage` | `string` | retirement message |
| `amount` | `BigNumber` | The amount of TCO2 to retire |
| `tco2Address` | `string` | address of the TCO2 token to retire* |

#### Returns

`Promise`<`ContractReceipt`\>

retirement transaction

**`Description`**

retires/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction

#### Defined in

[index.ts:124](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L124)

___

### retireFrom

▸ **retireFrom**(`amount`, `address`, `tco2Address`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | The amount of TCO2 to retire |
| `address` | `string` | address of the account to retire from |
| `tco2Address` | `string` | address of the TCO2 token to retire* |

#### Returns

`Promise`<`ContractReceipt`\>

retirement transaction

**`Description`**

retires/burns an amount of TCO2s from a different address/wallet

**`Notice`**

requires approval from the address you're trying to retire from

#### Defined in

[index.ts:154](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L154)

___

### setProvider

▸ **setProvider**(`provider`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `Provider` |

#### Returns

`void`

#### Defined in

[index.ts:88](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L88)

___

### setSigner

▸ **setSigner**(`signer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

`void`

#### Defined in

[index.ts:84](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/index.ts#L84)
