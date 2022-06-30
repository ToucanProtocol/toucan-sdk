import { TypedDocumentNode } from "@urql/core";

import { PoolSymbol } from ".";
import {
  AggregationsSchema,
  BatchCommentSchema,
  BatchTokenSchema,
  PooledTCO2TokenSchema,
  ProjectSchema,
  ProjectVintageSchema,
  RedeemSchema,
  RetirementCertificateSchema,
  RetirementSchema,
  TCO2BalanceSchema,
  TCO2TokenSchema,
  UserSchema,
} from "./schemas";

/**
 * I have decided to separated the types for the subgraph methods here as using Pick to separate
 * the needed properties from the schemas can become verbose as you will see below.
 *
 * See types/schemas.ts for more information on why I decided to use Pick in the first place.
 */

// --------------------------------------------------------------------------------
//  Batches Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchUserBatchesResult = Array<
  Pick<
    BatchTokenSchema,
    "id" | "tx" | "serialNumber" | "quantity" | "confirmationStatus"
  > & {
    comments: Array<
      Pick<BatchCommentSchema, "id" | "comment"> & {
        sender: Pick<UserSchema, "id">;
      }
    >;
    creator: Pick<UserSchema, "id">;
  }
>;

export type fetchUserBatchesMethod = (
  walletAddress: string
) => Promise<fetchUserBatchesResult | undefined>;

// --------------------------------------------------------------------------------
//  TCO2Tokens Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchTCO2TokenResult = Pick<
  TCO2TokenSchema,
  "id" | "name" | "symbol" | "address"
> & {
  projectVintage: Pick<ProjectVintageSchema, "name"> & {
    project: Pick<ProjectSchema, "projectId">;
  };
};

export type fetchTCO2TokenByIdMethod = (
  id: string
) => Promise<fetchTCO2TokenResult | undefined>;

export type fetchTCO2TokenByFullSymbolMethod = (
  symbol: string
) => Promise<fetchTCO2TokenResult | undefined>;

export type fetchAllTCO2TokensMethod = () => Promise<fetchTCO2TokenResult[]>;

// --------------------------------------------------------------------------------
//  BatchTokens Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchBridgedBatchTokensResult = Pick<
  BatchTokenSchema,
  "id" | "serialNumber" | "quantity" | "timestamp" | "tx"
> & { creator: Pick<UserSchema, "id"> };

export type fetchBridgedBatchTokensMethod = () => Promise<
  fetchBridgedBatchTokensResult[]
>;

// --------------------------------------------------------------------------------
//  Retirements Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchUserRetirementsResult = Pick<
  RetirementSchema,
  "id" | "creationTx" | "amount" | "timestamp"
> & {
  token: Pick<TCO2TokenSchema, "symbol" | "name" | "address"> & {
    projectVintage: Pick<ProjectVintageSchema, "name"> & {
      project: Pick<ProjectSchema, "projectId">;
    };
  };
  certificate: Pick<
    RetirementCertificateSchema,
    | "id"
    | "retiringEntityString"
    | "beneficiaryString"
    | "retirementMessage"
    | "createdAt"
  > & {
    retiringEntity: Pick<UserSchema, "id">;
    beneficiary: Pick<UserSchema, "id">;
  };
};

export type fetchUserRetirementsMethod = (
  walletAddress: string,
  first?: number,
  skip?: number
) => Promise<fetchUserRetirementsResult[] | undefined>;

// --------------------------------------------------------------------------------
//  Redeems Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchRedeemsResult = Pick<
  RedeemSchema,
  "id" | "amount" | "timestamp"
> & {
  creator: Pick<UserSchema, "id">;
  token: Pick<TCO2TokenSchema, "symbol" | "name" | "address"> & {
    projectVintage: Pick<ProjectVintageSchema, "name"> & {
      project: Pick<ProjectSchema, "projectId">;
    };
  };
};

export type fetchRedeemsMethod = (
  pool: PoolSymbol,
  first?: number,
  skip?: number
) => Promise<fetchRedeemsResult[] | undefined>;

export type fetchUserRedeemsMethod = (
  walletAddress: string,
  pool: PoolSymbol,
  first?: number,
  skip?: number
) => Promise<fetchRedeemsResult[] | undefined>;

// --------------------------------------------------------------------------------
//  PooledTCO2Tokens Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchPoolContentsResult = Pick<PooledTCO2TokenSchema, "amount"> & {
  token: Pick<TCO2TokenSchema, "name"> & {
    projectVintage: Pick<ProjectVintageSchema, "id"> & {
      project: Pick<ProjectSchema, "methodology" | "standard">;
    };
  };
};

export type fetchPoolContentsMethod = (
  PoolSymbol: PoolSymbol,
  first?: number,
  skip?: number
) => Promise<fetchPoolContentsResult[] | undefined>;

// --------------------------------------------------------------------------------
//  Projects Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchProjectResult = Pick<
  ProjectSchema,
  "projectId" | "region" | "standard" | "methodology"
> & { vintages: Pick<ProjectVintageSchema, "id"> };

export type fetchProjectByIdMethod = (
  id: string
) => Promise<fetchProjectResult | undefined>;

export type fetchProjectsByIdsMethod = (
  ids: Array<string>
) => Promise<fetchProjectResult[] | undefined>;

// --------------------------------------------------------------------------------
//  Aggregations Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchAggregationsMethod = () => Promise<
  AggregationsSchema[] | undefined
>;

// --------------------------------------------------------------------------------
//  TCO2Balances Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchBalanceResult = Pick<TCO2BalanceSchema, "balance"> & {
  token: Pick<TCO2TokenSchema, "symbol">;
};

export type fetchUserTCO2BalanceMethod = (
  userAddress: string,
  tokenAddress: string
) => Promise<fetchBalanceResult | undefined>;

// --------------------------------------------------------------------------------
//  Other Subgraph Methods
// --------------------------------------------------------------------------------

export type fetchCustomQueryMethod = <Type>(
  query: TypedDocumentNode<any, object>,
  params?: Record<string, unknown>
) => Promise<Type | undefined>;
