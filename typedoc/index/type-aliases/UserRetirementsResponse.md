[**toucan-sdk**](../../README.md)

***

[toucan-sdk](../../modules.md) / [index](../README.md) / UserRetirementsResponse

# Type Alias: UserRetirementsResponse

> **UserRetirementsResponse** = `Pick`\<`RetirementSchema`, `"id"` \| `"creationTx"` \| `"amount"` \| `"timestamp"`\> & `object`

Defined in: [types/responses.ts:92](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/types/responses.ts#L92)

## Type declaration

### certificate

> **certificate**: `Pick`\<`RetirementCertificateSchema`, `"id"` \| `"retiringEntityString"` \| `"beneficiaryString"` \| `"retirementMessage"` \| `"createdAt"`\> & `object`

#### Type declaration

##### beneficiary

> **beneficiary**: `Pick`\<`UserSchema`, `"id"`\>

##### retiringEntity

> **retiringEntity**: `Pick`\<`UserSchema`, `"id"`\>

### token

> **token**: `Pick`\<`TCO2TokenSchema`, `"symbol"` \| `"name"` \| `"address"`\> & `object`

#### Type declaration

##### projectVintage

> **projectVintage**: `Pick`\<`ProjectVintageSchema`, `"name"`\> & `object`

###### Type declaration

###### project

> **project**: `Pick`\<`ProjectSchema`, `"projectId"`\>
