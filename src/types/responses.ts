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

import {
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
//  Batches Subgraph Responses
// --------------------------------------------------------------------------------

export type UserBatchesResponse = Array<
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

// --------------------------------------------------------------------------------
//  TCO2Tokens Subgraph Responses
// --------------------------------------------------------------------------------

export type TCO2TokenResponse = Pick<
  TCO2TokenSchema,
  "id" | "name" | "symbol" | "address"
> & {
  projectVintage: Pick<ProjectVintageSchema, "name"> & {
    project: Pick<ProjectSchema, "projectId">;
  };
};

// --------------------------------------------------------------------------------
//  BatchTokens Subgraph Responses
// --------------------------------------------------------------------------------

export type BridgedBatchTokensResponse = Pick<
  BatchTokenSchema,
  "id" | "serialNumber" | "quantity" | "timestamp" | "tx"
> & { creator: Pick<UserSchema, "id"> };

// --------------------------------------------------------------------------------
//  Retirements Subgraph Responses
// --------------------------------------------------------------------------------

export type UserRetirementsResponse = Pick<
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

// --------------------------------------------------------------------------------
//  Redeems Subgraph Responses
// --------------------------------------------------------------------------------

export type RedeemsResponse = Pick<
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

// --------------------------------------------------------------------------------
//  PooledTCO2Tokens Subgraph Responses
// --------------------------------------------------------------------------------

export type PoolContentsResponse = Pick<PooledTCO2TokenSchema, "amount"> & {
  token: Pick<TCO2TokenSchema, "name"> & {
    projectVintage: Pick<ProjectVintageSchema, "id"> & {
      project: Pick<ProjectSchema, "methodology" | "standard">;
    };
  };
};

// --------------------------------------------------------------------------------
//  Projects Subgraph Responses
// --------------------------------------------------------------------------------

export type ProjectResponse = Pick<
  ProjectSchema,
  "projectId" | "region" | "standard" | "methodology"
> & { vintages: Pick<ProjectVintageSchema, "id"> };

// --------------------------------------------------------------------------------
//  TCO2Balances Subgraph Responses
// --------------------------------------------------------------------------------

export type BalanceResponse = Pick<TCO2BalanceSchema, "balance"> & {
  token: Pick<TCO2TokenSchema, "symbol">;
};
