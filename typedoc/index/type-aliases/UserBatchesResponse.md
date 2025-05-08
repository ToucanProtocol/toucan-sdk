[**toucan-sdk**](../../README.md)

***

[toucan-sdk](../../modules.md) / [index](../README.md) / UserBatchesResponse

# Type Alias: UserBatchesResponse

> **UserBatchesResponse** = `Pick`\<`BatchTokenSchema`, `"id"` \| `"tx"` \| `"serialNumber"` \| `"quantity"` \| `"confirmationStatus"`\> & `object`[]

Defined in: [types/responses.ts:52](https://github.com/ToucanProtocol/toucan-sdk/blob/65ec31518e31e7e8f8151ebebf28dd8a96275401/src/types/responses.ts#L52)

I have decided to separated the types for the subgraph methods here as using Pick to separate
the needed properties from the schemas can become verbose as you will see below.

See types/schemas.ts for more information on why I decided to use Pick in the first place.
