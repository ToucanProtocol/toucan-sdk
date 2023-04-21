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

import { TypedDocumentNode } from "@urql/core";

import { PoolSymbol } from ".";
import {
  BalanceResponse,
  BridgedBatchTokensResponse,
  PoolContentsResponse,
  ProjectResponse,
  RedeemsResponse,
  TCO2TokenResponse,
  UserBatchesResponse,
  UserRetirementsResponse,
} from "./responses";
import { AggregationsSchema } from "./schemas";

/**
 * I have decided to separated the types for the subgraph methods here as using Pick to separate
 * the needed properties from the schemas can become verbose as you will see below.
 *
 * See types/schemas.ts for more information on why I decided to use Pick in the first place.
 */

// --------------------------------------------------------------------------------
//  Batches Subgraph Methods
// --------------------------------------------------------------------------------

export type UserBatchesMethod = (
  walletAddress: string
) => Promise<UserBatchesResponse | undefined>;

// --------------------------------------------------------------------------------
//  TCO2Tokens Subgraph Methods
// --------------------------------------------------------------------------------

export type TCO2TokenByIdMethod = (
  id: string
) => Promise<TCO2TokenResponse | undefined>;

export type TCO2TokenByFullSymbolMethod = (
  symbol: string
) => Promise<TCO2TokenResponse | undefined>;

export type AllTCO2TokensMethod = () => Promise<TCO2TokenResponse[]>;

// --------------------------------------------------------------------------------
//  BatchTokens Subgraph Methods
// --------------------------------------------------------------------------------

export type BridgedBatchTokensMethod = () => Promise<
  BridgedBatchTokensResponse[]
>;

// --------------------------------------------------------------------------------
//  Retirements Subgraph Methods
// --------------------------------------------------------------------------------

export type UserRetirementsMethod = (
  walletAddress: string,
  first?: number,
  skip?: number
) => Promise<UserRetirementsResponse[] | undefined>;

// --------------------------------------------------------------------------------
//  Redeems Subgraph Methods
// --------------------------------------------------------------------------------

export type RedeemsMethod = (
  pool: PoolSymbol,
  first?: number,
  skip?: number
) => Promise<RedeemsResponse[] | undefined>;

export type UserRedeemsMethod = (
  walletAddress: string,
  pool: PoolSymbol,
  first?: number,
  skip?: number
) => Promise<RedeemsResponse[] | undefined>;

// --------------------------------------------------------------------------------
//  PooledTCO2Tokens Subgraph Methods
// --------------------------------------------------------------------------------

export type PoolContentsMethod = (
  pool: PoolSymbol,
  first?: number,
  skip?: number
) => Promise<PoolContentsResponse[] | undefined>;

// --------------------------------------------------------------------------------
//  Projects Subgraph Methods
// --------------------------------------------------------------------------------

export type ProjectByIdMethod = (
  id: string
) => Promise<ProjectResponse | undefined>;

export type ProjectsByIdsMethod = (
  ids: Array<string>
) => Promise<ProjectResponse[] | undefined>;

// --------------------------------------------------------------------------------
//  Aggregations Subgraph Methods
// --------------------------------------------------------------------------------

export type AggregationsMethod = () => Promise<
  AggregationsSchema[] | undefined
>;

// --------------------------------------------------------------------------------
//  TCO2Balances Subgraph Methods
// --------------------------------------------------------------------------------

export type UserTCO2BalanceMethod = (
  userAddress: string,
  tokenAddress: string
) => Promise<BalanceResponse | undefined>;

// --------------------------------------------------------------------------------
//  Other Subgraph Methods
// --------------------------------------------------------------------------------

export type CustomQueryMethod = <Type>(
  query: TypedDocumentNode<any, object>,
  params?: Record<string, unknown>
) => Promise<Type | undefined>;
