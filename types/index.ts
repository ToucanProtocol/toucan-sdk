import { ethers } from "ethers";

export type allowedNetworks = "polygon" | "mumbai";

export type providerish =
  | ethers.providers.Web3Provider
  | ethers.providers.JsonRpcProvider;

export type signerish = ethers.providers.Provider | ethers.Signer;
