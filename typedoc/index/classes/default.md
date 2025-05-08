[**toucan-sdk**](../../README.md)

***

[toucan-sdk](../../modules.md) / [index](../README.md) / default

# Class: default

Defined in: [index.ts:57](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L57)

ContractInteractions

## Description

This class wraps around classes that help users to interact with Toucan infrastructure

## Implements

ContractInteractions, SubgraphInteractions

## Constructors

### Constructor

> **new default**(`network`, `provider?`, `signer?`): `ToucanClient`

Defined in: [index.ts:70](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L70)

#### Parameters

##### network

`Network`

network that you want to work on

##### provider?

`Provider`

to be able to read from the blockchain

##### signer?

`Signer`

to be able to sign transactions

#### Returns

`ToucanClient`

## Properties

### contractInteractions

> **contractInteractions**: `ContractInteractions`

Defined in: [index.ts:61](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L61)

***

### fetchAggregations

> **fetchAggregations**: `AggregationsMethod`

Defined in: [index.ts:798](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L798)

#### Description

fetch all aggregations (including, for example, tco2TotalRetired or totalCarbonBridged)

#### Returns

an array of Aggregation objects containing properties like id, key, value

***

### fetchAllTCO2Tokens

> **fetchAllTCO2Tokens**: `AllTCO2TokensMethod`

Defined in: [index.ts:675](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L675)

#### Description

fetches TCO2Details of all TCO2s

#### Returns

an array of TCO2Detail objects with properties of the TCO2s (name, address, etc)

***

### fetchBridgedBatchTokens

> **fetchBridgedBatchTokens**: `BridgedBatchTokensMethod`

Defined in: [index.ts:688](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L688)

#### Description

fetches data about BatchTokens that have been bridged

#### Returns

an array of BatchTokens containing different properties like id, serialNumber or quantity

***

### fetchCustomQuery

> **fetchCustomQuery**: `CustomQueryMethod`

Defined in: [index.ts:813](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L813)

#### Description

if pre-made queries to Toucan's Subgraph don't fit all your needs; use this for custom queries

#### Param

a gql formated GraphQL query

#### Param

any parameters you may want to pass to the query

#### Returns

all data fetched from query; you can use generics to declare what type to expect (if you're a fan of TS)

***

### fetchPoolContents

> **fetchPoolContents**: `PoolContentsMethod`

Defined in: [index.ts:767](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L767)

#### Description

fetches TCO2 tokens that are part of the given pool

#### Param

The pool symbol of the pool to fetch for

#### Param

how many TCO2 tokens you want fetched; defaults to 1000

#### Param

how many (if any) retirements you want skipped; defaults to 0

#### Returns

an array of objects representing TCO2 tokens and containing properties like name, amount, methodology and more

***

### fetchProjectById

> **fetchProjectById**: `ProjectByIdMethod`

Defined in: [index.ts:785](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L785)

#### Description

fetches a project by its id

#### Param

id of the project to fetch; e.g.: "10"

#### Returns

an object with properties of the Project like projectId, region, standard and more

***

### fetchRedeems

> **fetchRedeems**: `RedeemsMethod`

Defined in: [index.ts:728](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L728)

#### Description

fetches redeems of a given pool

#### Param

The pool symbol of pool to fetch for

#### Param

how many redeems you want fetched; defaults to 100

#### Param

how many (if any) redeems you want skipped; defaults to 0

#### Returns

an array of objects with properties of the redeems like id, amount, timestamp and more

***

### fetchTCO2TokenByFullSymbol

> **fetchTCO2TokenByFullSymbol**: `TCO2TokenByFullSymbolMethod`

Defined in: [index.ts:664](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L664)

#### Description

fetches properties of a TCO2

#### Param

full symbol of the TCO2 to query for e.g.: "TCO2-VCS-1718-2013"

#### Returns

a TCO2Detail object with properties of the TCO2 (name, address, etc)

***

### fetchTCO2TokenById

> **fetchTCO2TokenById**: `TCO2TokenByIdMethod`

Defined in: [index.ts:654](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L654)

#### Description

fetches properties of a TCO2

#### Param

id of the TCO2 to query for; the id happens to be the same as the address e.g.: "0x004090eef602e024b2a6cb7f0c1edda992382994"

#### Returns

a TCO2Detail object with properties of the TCO2 (name, address, etc)

***

### fetchUserBatches

> **fetchUserBatches**: `UserBatchesMethod`

Defined in: [index.ts:640](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L640)

#### Description

fetches the batches of a user

#### Param

address of user to query for

#### Returns

an array of BatchTokens (they contain different properties of the Batch)

***

### fetchUserRedeems

> **fetchUserRedeems**: `UserRedeemsMethod`

Defined in: [index.ts:741](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L741)

#### Description

fetches redeems of a given pool and user

#### Param

address of the user/wallet to query for

#### Param

The pool symbol of pool to fetch for

#### Param

how many redeems you want fetched; defaults to 100

#### Param

how many (if any) redeems you want skipped; defaults to 0

#### Returns

an array of objects with properties of the redeems like id, amount, timestamp and more

***

### fetchUserRetirements

> **fetchUserRetirements**: `UserRetirementsMethod`

Defined in: [index.ts:704](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L704)

#### Description

fetches retirements made by a user

#### Param

address of the user/wallet to query for

#### Param

how many retirements you want fetched; defaults to 100

#### Param

how many (if any) retirements you want skipped; defaults to 0

#### Returns

an array of objects containing properties of the retirements like id, creationTx, amount and more

***

### network

> **network**: `Network`

Defined in: [index.ts:60](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L60)

***

### provider

> **provider**: `undefined` \| `Provider`

Defined in: [index.ts:59](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L59)

***

### signer

> **signer**: `undefined` \| `Signer`

Defined in: [index.ts:58](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L58)

***

### subgraphInteractions

> **subgraphInteractions**: `SubgraphInteractions`

Defined in: [index.ts:62](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L62)

## Methods

### autoOffsetExactInETH()

> **autoOffsetExactInETH**(`pool`, `amount`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:508](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L508)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use e.g., "NCT"

##### amount

`BigNumber`

the amount of native tokens e.g., MATIC to swap into Toucan pool token. Full amount will be used for offsetting.

#### Returns

`Promise`\<`ContractReceipt`\>

The offset transaction.

#### Description

Swaps ETH for carbon pool tokens and uses them to retire carbon

#### Notice

This method may take up to 1 minute to return a result

***

### autoOffsetExactInToken()

> **autoOffsetExactInToken**(`swapToken`, `pool`, `amount`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:458](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L458)

#### Parameters

##### swapToken

`string`

portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

the amount of ERC20 token to swap into Toucan pool token. Full amount will be used for offsetting.

#### Returns

`Promise`\<`ContractReceipt`\>

The offset transaction.

#### Description

retires carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending ERC20
tokens (cUSD, USDC, WETH, WMATIC). All provided tokens are consumed for offsetting.

#### Notice

this method needs two different actions signed and may take up to 1 minute to return a result

#### Dev

When automatically redeeming pool tokens for the oldest ones
TCO2s there are no fees and you receive exactly 1 TCO2 token for 1 pool
token.

***

### autoOffsetExactOutETH()

> **autoOffsetExactOutETH**(`pool`, `amount`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:485](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L485)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

The amount of CO2 tons to offset

#### Returns

`Promise`\<`ContractReceipt`\>

The offset transaction.

#### Description

retires a specified amount of  carbon credits using the oldest TCO2 tokens available from the specified Toucan token pool by sending a native token e.g. MATIC.

#### Dev

Use `calculateNeededETHAmount()` first in order to find out how much  of the native token e.g. MATIC is required to retire the specified quantity of TCO2. If the user sends much native token e.g. MATIC, the leftover amount will be sent back to the user.

#### Notice

This method may take up to 1 minute to return a result

***

### autoOffsetExactOutToken()

> **autoOffsetExactOutToken**(`swapToken`, `pool`, `amount`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:426](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L426)

#### Parameters

##### swapToken

`string`

portal for the token to swap into pool tokens (only accepts WETH, WMATIC and USDC)

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

The amount of CO2 tons to offset

#### Returns

`Promise`\<`ContractReceipt`\>

The offset transaction.

#### Description

retires a specified amount of  carbon credits using the lowest
quality (oldest) TCO2 tokens available from the specified Toucan token pool by sending ERC20
tokens (cUSD, USDC, WETH, WMATIC).

#### Notice

this method needs two different actions signed and may take up to 1 minute to return a result

***

### autoOffsetPoolToken()

> **autoOffsetPoolToken**(`pool`, `amount`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:404](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L404)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool token to offset,
e.g., NCT

##### amount

`BigNumber`

The amount of of TCO2 to offset.

#### Returns

`Promise`\<`ContractReceipt`\>

The offset transaction.

#### Description

retires carbon credits using the oldest TCO2
tokens available by sending pool tokens, e.g., NCT.

#### Notice

This method may take up to 1 minute to return a result

***

### calculateExpectedPoolTokenForETH()

> **calculateExpectedPoolTokenForETH**(`pool`, `amount`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:614](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L614)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

The amount of native tokens  to swap for,
e.g., MATIC

#### Returns

`Promise`\<`BigNumber`\>

amount   The expected amount of Pool token that can be acquired.

#### Description

Calculates the expected amount of Toucan Pool token that can be
acquired by swapping the provided amount of native tokens e.g., MATIC.

***

### calculateExpectedPoolTokenForToken()

> **calculateExpectedPoolTokenForToken**(`swapToken`, `pool`, `amount`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:587](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L587)

#### Parameters

##### swapToken

`string`

The ERC20 token used for the swap

##### pool

`PoolSymbol`

The pool symbol of the pool token to swap for,
e.g., NCT

##### amount

`BigNumber`

The amount of ERC20 token to swap

#### Returns

`Promise`\<`BigNumber`\>

amount  The expected amount of Pool token that can be acquired.

#### Description

Calculates the expected amount of Toucan Pool token that can be
acquired by swapping the provided amount of ERC20 token.

***

### calculateNeededETHAmount()

> **calculateNeededETHAmount**(`pool`, `amount`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:560](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L560)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool token to swap for,
e.g., NCT

##### amount

`BigNumber`

The desired amount of pool token to receive

#### Returns

`Promise`\<`BigNumber`\>

amount of native tokens, e.g., MATIC required in order to swap for
the specified amount of the pool token.

#### Description

Calculates the amount of native tokens e.g, MATIC is required in order to swap for the
desired amount of a Toucan pool token, e.g., NCT.

***

### calculateNeededTokenAmount()

> **calculateNeededTokenAmount**(`swapToken`, `pool`, `amount`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:532](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L532)

#### Parameters

##### swapToken

`string`

The ERC20 token used for the swap

##### pool

`PoolSymbol`

The pool symbol of the pool token to swap for,
e.g., NCT

##### amount

`BigNumber`

The desired amount of pool token to receive

#### Returns

`Promise`\<`BigNumber`\>

amount  of the ERC20 token required in order to
swap for the specified amount of the pool token.

#### Description

Calculates how much of the specified ERC20 token is required in
order to swap for the desired amount of a Toucan pool token, for
example, e.g., NCT.

***

### calculateRedeemFees()

> **calculateRedeemFees**(`pool`, `tco2s`, `amounts`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:273](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L273)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### tco2s

`string`[]

array of TCO2 contract addresses

##### amounts

`BigNumber`[]

array of amounts to redeem for each tco2s

#### Returns

`Promise`\<`BigNumber`\>

amount of fees it will cost to redeem.

#### Description

calculates the fees to selectively redeem pool tokens for TCO2s

#### Notice

tco2s must match amounts; amounts[0] is the amount of tco2[0] token to redeem for

***

### checkEligible()

> **checkEligible**(`pool`, `tco2`): `Promise`\<`boolean`\>

Defined in: [index.ts:253](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L253)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### tco2

`string`

address of TCO2 to deposit

#### Returns

`Promise`\<`boolean`\>

boolean

#### Description

checks if TCO2 is eligible for pool

***

### checkIfTCO2()

> **checkIfTCO2**(`address`): `Promise`\<`boolean`\>

Defined in: [index.ts:381](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L381)

#### Parameters

##### address

`string`

address of contract to check

#### Returns

`Promise`\<`boolean`\>

boolean

#### Description

checks if an address represents a TCO2

***

### depositTCO2()

> **depositTCO2**(`pool`, `amount`, `tco2Address`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:230](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L230)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

The amount of TCO2s to deposit

##### tco2Address

`string`

address of the TCO2 token to deposit*

#### Returns

`Promise`\<`ContractReceipt`\>

deposit transaction

#### Description

deposits TCO2s in the pool which mints a pool token for the user

***

### fetchTokenPriceOnDex()

> **fetchTokenPriceOnDex**(`pool`): `Promise`\<\{ `liquidityUSD`: `null` \| `number`; `price`: `null` \| `number`; `url`: `null` \| `string`; `volumeUSD`: `null` \| `number`; \}\>

Defined in: [index.ts:826](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L826)

#### Parameters

##### pool

`PoolSymbol`

#### Returns

`Promise`\<\{ `liquidityUSD`: `null` \| `number`; `price`: `null` \| `number`; `url`: `null` \| `string`; `volumeUSD`: `null` \| `number`; \}\>

***

### getAttributes()

> **getAttributes**(`tco2Address`): `Promise`\<\[`ProjectDataStructOutput`, `VintageDataStructOutput`\]\>

Defined in: [index.ts:191](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L191)

#### Parameters

##### tco2Address

`string`

address of the TCO2 token

#### Returns

`Promise`\<\[`ProjectDataStructOutput`, `VintageDataStructOutput`\]\>

an array of attributes

#### Description

gets the attributes of the project represented by the TCO2

***

### getDepositCap()

> **getDepositCap**(`tco2Address`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:175](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L175)

#### Parameters

##### tco2Address

`string`

address of the TCO2 token

#### Returns

`Promise`\<`BigNumber`\>

#### Description

gets the cap for TCO2s based on `totalVintageQuantity`

***

### getOffsetHelperContract()

> **getOffsetHelperContract**(): `OffsetHelper`

Defined in: [index.ts:895](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L895)

#### Returns

`OffsetHelper`

a ethers.contract to interact with the OffsetHelper

#### Description

gets the contract of a the OffsetHelper contract

***

### getPoolAddress()

> **getPoolAddress**(`pool`): `string`

Defined in: [index.ts:847](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L847)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

#### Returns

`string`

a ethers.contract to interact with the pool

#### Description

gets the contract of a pool token based on the symbol

***

### getPoolContract()

> **getPoolContract**(`pool`): `IToucanPoolToken`

Defined in: [index.ts:858](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L858)

#### Parameters

##### pool

`PoolSymbol`

#### Returns

`IToucanPoolToken`

a ethers.contract to interact with the pool

#### Dev

#### Description

gets the contract of a pool token based on the symbol

***

### getPoolRemaining()

> **getPoolRemaining**(`pool`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:349](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L349)

#### Parameters

##### pool

`PoolSymbol`

#### Returns

`Promise`\<`BigNumber`\>

BigNumber representing the remaining space

#### Description

gets the remaining space in pool contract before hitting the cap

***

### getRegistryContract()

> **getRegistryContract**(): `ToucanContractRegistry`

Defined in: [index.ts:883](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L883)

#### Returns

`ToucanContractRegistry`

a ethers.contract to interact with the contract registry

#### Description

gets the contract of a the Toucan contract registry

***

### getScoredTCO2s()

> **getScoredTCO2s**(`pool`): `Promise`\<`string`[]\>

Defined in: [index.ts:362](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L362)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

#### Returns

`Promise`\<`string`[]\>

array of TCO2 addresses by rank

#### Description

gets an array of scored TCO2s; scoredTCO2s[0] is lowest ranked

***

### getTCO2Contract()

> **getTCO2Contract**(`address`): `ToucanCarbonOffsets`

Defined in: [index.ts:871](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L871)

#### Parameters

##### address

`string`

address of TCO2 ethers.Contract to insantiate

#### Returns

`ToucanCarbonOffsets`

a ethers.contract to interact with the token

#### Description

gets the contract of a TCO2 token based on the address

***

### getTCO2Remaining()

> **getTCO2Remaining**(`tco2Address`): `Promise`\<`BigNumber`\>

Defined in: [index.ts:207](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L207)

#### Parameters

##### tco2Address

`string`

address of the TCO2 token

#### Returns

`Promise`\<`BigNumber`\>

BigNumber representing the remaining space

#### Description

gets the remaining space in TCO2 contract before hitting the cap

***

### redeemAuto()

> **redeemAuto**(`pool`, `amount`): `Promise`\<[`RedeemAutoResponse`](../type-aliases/RedeemAutoResponse.md)\>

Defined in: [index.ts:315](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L315)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

amount to redeem

#### Returns

`Promise`\<[`RedeemAutoResponse`](../type-aliases/RedeemAutoResponse.md)\>

redeem transaction

#### Description

automatically redeems pool tokens for TCO2s

***

### ~~redeemAuto2()~~

> **redeemAuto2**(`pool`, `amount`): `Promise`\<[`RedeemAutoResponse`](../type-aliases/RedeemAutoResponse.md)\>

Defined in: [index.ts:333](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L333)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### amount

`BigNumber`

amount to redeem

#### Returns

`Promise`\<[`RedeemAutoResponse`](../type-aliases/RedeemAutoResponse.md)\>

array containing tco2 addresses (string) and amounts (BigNumber)

#### Deprecated

This function is deprecated. Please use `redeemAuto` instead.

#### Description

automatically redeems pool tokens for TCO2s

***

### redeemMany()

> **redeemMany**(`pool`, `tco2s`, `amounts`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:297](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L297)

#### Parameters

##### pool

`PoolSymbol`

The pool symbol of the pool (token) to use

##### tco2s

`string`[]

array of TCO2 contract addresses

##### amounts

`BigNumber`[]

array of amounts to redeem for each tco2s

#### Returns

`Promise`\<`ContractReceipt`\>

redeem transaction

#### Description

selectively redeems pool tokens for TCO2s

***

### retire()

> **retire**(`amount`, `tco2Address`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:103](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L103)

#### Parameters

##### amount

`BigNumber`

The amount of TCO2 to retire

##### tco2Address

`string`

address of the TCO2 token to retire*

#### Returns

`Promise`\<`ContractReceipt`\>

retirement transaction

#### Description

retires/burns an amount of TCO2s (each represents 1 ton of CO2) to achieve offset

***

### retireAndMintCertificate()

> **retireAndMintCertificate**(`retirementEntityName`, `beneficiaryAddress`, `beneficiaryName`, `retirementMessage`, `amount`, `tco2Address`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:123](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L123)

#### Parameters

##### retirementEntityName

`string`

name of the entity that does the retirement (you)

##### beneficiaryAddress

`string`

address of the beneficiary (in case you're retiring for someone else)

##### beneficiaryName

`string`

name of the beneficiary

##### retirementMessage

`string`

retirement message

##### amount

`BigNumber`

The amount of TCO2 to retire

##### tco2Address

`string`

address of the TCO2 token to retire*

#### Returns

`Promise`\<`ContractReceipt`\>

retirement transaction

#### Description

retires/burns an amount of TCO2s & mints the NFT certificate for it within the same transaction

***

### retireFrom()

> **retireFrom**(`amount`, `address`, `tco2Address`): `Promise`\<`ContractReceipt`\>

Defined in: [index.ts:153](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L153)

#### Parameters

##### amount

`BigNumber`

The amount of TCO2 to retire

##### address

`string`

address of the account to retire from

##### tco2Address

`string`

address of the TCO2 token to retire*

#### Returns

`Promise`\<`ContractReceipt`\>

retirement transaction

#### Description

retires/burns an amount of TCO2s from a different address/wallet

#### Notice

requires approval from the address you're trying to retire from

***

### setProvider()

> **setProvider**(`provider`): `void`

Defined in: [index.ts:87](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L87)

#### Parameters

##### provider

`Provider`

#### Returns

`void`

***

### setSigner()

> **setSigner**(`signer`): `void`

Defined in: [index.ts:83](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/index.ts#L83)

#### Parameters

##### signer

`Signer`

#### Returns

`void`
