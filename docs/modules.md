[toucan-sdk](README.md) / Exports

# toucan-sdk

## Table of contents

### Classes

- [default](classes/default.md)

### Type Aliases

- [BalanceResponse](modules.md#balanceresponse)
- [BridgedBatchTokensResponse](modules.md#bridgedbatchtokensresponse)
- [PoolContentsResponse](modules.md#poolcontentsresponse)
- [ProjectResponse](modules.md#projectresponse)
- [RedeemAutoResponse](modules.md#redeemautoresponse)
- [RedeemsResponse](modules.md#redeemsresponse)
- [TCO2TokenResponse](modules.md#tco2tokenresponse)
- [UserBatchesResponse](modules.md#userbatchesresponse)
- [UserRetirementsResponse](modules.md#userretirementsresponse)

## Type Aliases

### BalanceResponse

Ƭ **BalanceResponse**: `Pick`<`TCO2BalanceSchema`, ``"balance"``\> & { `token`: `Pick`<`TCO2TokenSchema`, ``"symbol"``\>  }

#### Defined in

[types/responses.ts:155](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L155)

___

### BridgedBatchTokensResponse

Ƭ **BridgedBatchTokensResponse**: `Pick`<`BatchTokenSchema`, ``"id"`` \| ``"serialNumber"`` \| ``"quantity"`` \| ``"timestamp"`` \| ``"tx"``\> & { `creator`: `Pick`<`UserSchema`, ``"id"``\>  }

#### Defined in

[types/responses.ts:83](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L83)

___

### PoolContentsResponse

Ƭ **PoolContentsResponse**: `Pick`<`PooledTCO2TokenSchema`, ``"amount"``\> & { `token`: `Pick`<`TCO2TokenSchema`, ``"name"``\> & { `projectVintage`: `Pick`<`ProjectVintageSchema`, ``"id"``\> & { `project`: `Pick`<`ProjectSchema`, ``"methodology"`` \| ``"standard"``\>  }  }  }

#### Defined in

[types/responses.ts:134](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L134)

___

### ProjectResponse

Ƭ **ProjectResponse**: `Pick`<`ProjectSchema`, ``"projectId"`` \| ``"region"`` \| ``"standard"`` \| ``"methodology"``\> & { `vintages`: `Pick`<`ProjectVintageSchema`, ``"id"``\>  }

#### Defined in

[types/responses.ts:146](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L146)

___

### RedeemAutoResponse

Ƭ **RedeemAutoResponse**: { `address`: `string` ; `amount`: `BigNumber`  }[]

#### Defined in

[types/responses.ts:39](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L39)

___

### RedeemsResponse

Ƭ **RedeemsResponse**: `Pick`<`RedeemSchema`, ``"id"`` \| ``"amount"`` \| ``"timestamp"``\> & { `creator`: `Pick`<`UserSchema`, ``"id"``\> ; `token`: `Pick`<`TCO2TokenSchema`, ``"symbol"`` \| ``"name"`` \| ``"address"``\> & { `projectVintage`: `Pick`<`ProjectVintageSchema`, ``"name"``\> & { `project`: `Pick`<`ProjectSchema`, ``"projectId"``\>  }  }  }

#### Defined in

[types/responses.ts:118](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L118)

___

### TCO2TokenResponse

Ƭ **TCO2TokenResponse**: `Pick`<`TCO2TokenSchema`, ``"id"`` \| ``"name"`` \| ``"symbol"`` \| ``"address"``\> & { `projectVintage`: `Pick`<`ProjectVintageSchema`, ``"name"``\> & { `project`: `Pick`<`ProjectSchema`, ``"projectId"``\>  }  }

#### Defined in

[types/responses.ts:70](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L70)

___

### UserBatchesResponse

Ƭ **UserBatchesResponse**: `Pick`<`BatchTokenSchema`, ``"id"`` \| ``"tx"`` \| ``"serialNumber"`` \| ``"quantity"`` \| ``"confirmationStatus"``\> & { `comments`: `Pick`<`BatchCommentSchema`, ``"id"`` \| ``"comment"``\> & { `sender`: `Pick`<`UserSchema`, ``"id"``\>  }[] ; `creator`: `Pick`<`UserSchema`, ``"id"``\>  }[]

I have decided to separated the types for the subgraph methods here as using Pick to separate
the needed properties from the schemas can become verbose as you will see below.

See types/schemas.ts for more information on why I decided to use Pick in the first place.

#### Defined in

[types/responses.ts:52](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L52)

___

### UserRetirementsResponse

Ƭ **UserRetirementsResponse**: `Pick`<`RetirementSchema`, ``"id"`` \| ``"creationTx"`` \| ``"amount"`` \| ``"timestamp"``\> & { `certificate`: `Pick`<`RetirementCertificateSchema`, ``"id"`` \| ``"retiringEntityString"`` \| ``"beneficiaryString"`` \| ``"retirementMessage"`` \| ``"createdAt"``\> & { `beneficiary`: `Pick`<`UserSchema`, ``"id"``\> ; `retiringEntity`: `Pick`<`UserSchema`, ``"id"``\>  } ; `token`: `Pick`<`TCO2TokenSchema`, ``"symbol"`` \| ``"name"`` \| ``"address"``\> & { `projectVintage`: `Pick`<`ProjectVintageSchema`, ``"name"``\> & { `project`: `Pick`<`ProjectSchema`, ``"projectId"``\>  }  }  }

#### Defined in

[types/responses.ts:92](https://github.com/0xmichalis/toucan-sdk/blob/1488e66/src/types/responses.ts#L92)
