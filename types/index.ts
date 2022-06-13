import { ethers } from "ethers";

export type Network = "polygon" | "mumbai";

export type providerish =
  | ethers.providers.Web3Provider
  | ethers.providers.JsonRpcProvider;

export type signerish = ethers.providers.Provider | ethers.Signer;

export type poolSymbol = "BCT" | "NCT";

export declare enum RetirementStatus {
  Pending = 0,
  Rejected = 1,
  Confirmed = 2,
}
