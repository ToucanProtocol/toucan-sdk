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

import { RetirementStatus } from ".";

/**
 *
 * While it's true that using schemas adds the need to use Pick (see types/methods.ts) and that is verbose,
 * it does improve future consistency in the codebase.
 *
 * I've had a hard time fixing GraphQL syntax, typescript compile errors and bringing consistency
 * to the coding style of the methods I've copied from tokenizer for querying the subgraph.
 *
 * With that in mind, I think enforcing the use of Pick and of interfaces (like below) that match
 * the GraphQL schemas will make the codebase more maintainable long-term.
 *
 * P.S.: You'd be surpised how many errors came not having TS Strict or from having interfaces
 * that didn't account for the fact that certain properties in the query are nullable.
 *
 */

// --------------------------------------------------------------------------------
//  Toucan Schemas
// --------------------------------------------------------------------------------

export interface BatchTokenSchema {
  id: string; // e.g.: "10"
  creator: UserSchema;
  owner: UserSchema;
  projectVintage?: ProjectVintageSchema;
  serialNumber?: string;
  quantity?: number;
  confirmationStatus: RetirementStatus;
  timestamp: number;
  tx: string;
  contentURI?: string;
  comments: BatchCommentSchema[];
  aggregated?: boolean;
}

export interface RetirementSchema {
  id: string; // e.g.: "10"
  creationTx: string;
  amount: string; // wei
  timestamp: string;
  token: TCO2TokenSchema;
  creator: UserSchema;
  eventId: string;
  certificate?: RetirementCertificateSchema;
}

export interface UserSchema {
  id: string; // e.g.: "0x00000016f127c94a667ae3c9fdf0c31c9c79826f"
  batchesOwned: BatchTokenSchema[];
  batchesCreated: BatchTokenSchema[];
  batchComments: BatchCommentSchema[];
  projectsOwned: ProjectSchema[];
  projectsCreated: ProjectSchema[];
  vintagesOwned: ProjectVintageSchema[];
  vintagesCreated: ProjectVintageSchema[];
  retirementsCreated: RetirementSchema[];
  redeemsCreated: RedeemSchema[];
  tokensOwned?: TCO2BalanceSchema[];
}

export interface BatchCommentSchema {
  id: string; // e.g.: "1000-1"
  sender?: UserSchema;
  batch: BatchTokenSchema;
  comment: string;
}

export interface TCO2BalanceSchema {
  id: string; // e.g.: "0x0000000000000000000000000000000000000000-0x0044c5a5a6f626b673224a3c0d71e851ad3d5153"
  user: UserSchema;
  token: TCO2TokenSchema;
  balance: string; // wei
}

export interface RetirementCertificateSchema {
  id: string; // e.g.: "10"
  creationTx: string;
  updateTxs: string[];
  createdAt: string;
  retiringEntity: UserSchema;
  beneficiary: UserSchema;
  retiringEntityString: string;
  beneficiaryString: string;
  retirementMessage: string;
  retirements: RetirementSchema[];
}

export interface ProjectSchema {
  id: string; // e.g.: "10"
  creator: UserSchema;
  owner: UserSchema;
  timestamp: string;
  tx: string;
  projectId: string;
  vintages: ProjectVintageSchema[];
  standard: string;
  methodology?: string;
  region?: string;
  storageMethod?: string;
  method?: string;
  emissionType?: string;
  category?: string;
  uri?: string;
}

export interface TCO2TokenSchema {
  id: string; // e.g.: "0x004090eef602e024b2a6cb7f0c1edda992382994"
  creator: UserSchema;
  createdAt: string;
  creationTx: string;
  projectVintage: ProjectVintageSchema;
  name: string;
  symbol: string;
  address: string;
  score: string;
}

export interface PooledTCO2TokenSchema {
  id: string; // e.g.: "0x0044c5a5a6f626b673224a3c0d71e851ad3d5153-0x2f800db0fdb5223b3c3f354886d907a671414a7f"
  token: TCO2TokenSchema;
  poolAddress: string;
  amount: string;
}

export interface ProjectVintageSchema {
  id: string; // e.g.: "10"
  creator: UserSchema;
  owner: UserSchema;
  timestamp: string;
  tx: string;
  name: string;
  startTime: string;
  endTime: string;
  project?: ProjectSchema;
  batches: BatchTokenSchema[];
  totalVintageQuantity: string;
  isCorsiaCompliant: boolean;
  isCCPcompliant: boolean;
  coBenefits: string;
  correspAdjustment: string;
  additionalCertification: string;
  issuanceDate: string;
  tco2Token?: TCO2TokenSchema;
}

export interface RedeemSchema {
  id: string; // e.g. "0x001e3fd6b7203b0272cf7d44393bf10cda108b63521dfdc45dcbeee0a028e668"
  amount: string; // wei
  timestamp: string;
  token: TCO2TokenSchema;
  pool: string;
  creator: UserSchema;
}

export interface AggregationsSchema {
  id: string; // e.g. "tco2TotalRetired"
  key: string;
  value: string;
}

// --------------------------------------------------------------------------------
//  Sushiswap schemas
// --------------------------------------------------------------------------------

export interface PairSchema {
  id: string; // e.g.: "0x00046280073a3290801d2c1e13c6b5ff0252d3b3"
  factory: Factory;
  name: string;
  token0: TokenSchema;
  token1: TokenSchema;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
  reserveETH: string;
  reserveUSD: string;
  trackedReserveETH: string;
  token0Price: string;
  token1Price: string;
  volumeToken0: string;
  volumeToken1: string;
  volumeUSD: string;
  untrackedVolumeUSD: string;
  txCount: string;
  liquidityProviderCount: string;
  liquidityPositions: LiquidityPosition[];
  liquidityPositionSnapshots: LiquidityPositionSnapshot[];
  dayData: PairDayData[];
  hourData: PairHourData[];
  mints: Mint[];
  burns: Burn[];
  swaps: Swap[];
  timestamp: string;
  block: string;
}

export interface TokenSchema {
  id: string; // e.g.: "0x0000000059678e962fd104ed8b378b328d40494a"
  factory: Factory;
  symbol: string;
  name: string;
  decimals: string;
  totalSupply: string;
  volume: string;
  volumeUSD: string;
  untrackedVolumeUSD: string;
  txCount: string;
  liquidity: string;
  derivedETH: string;
  whitelistPairs: PairSchema;
  hourData: TokenHourData;
  dayData: TokenDayData;
  basePairs: PairSchema;
  quotePairs: PairSchema;
  basePairsDayData: PairDayData;
  quotePairsDayData: PairDayData;
}

type Factory = unknown;
type LiquidityPosition = unknown;
type LiquidityPositionSnapshot = unknown;
type PairDayData = unknown;
type PairHourData = unknown;
type Mint = unknown;
type Burn = unknown;
type Swap = unknown;
type TokenHourData = unknown;
type TokenDayData = unknown;
