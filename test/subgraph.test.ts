import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import ToucanClient from "../src";
import SubgraphInteractions from "../src/subclasses/SubgraphInteractions";

describe("Testing Toucan-SDK subgraph interactions", function () {
  let addr1: SignerWithAddress;
  let toucan: ToucanClient;

  before(async () => {
    [addr1] = await ethers.getSigners();
    toucan = new ToucanClient("alfajores", addr1);
  });

  it("Should fail to initialize SubgraphInteractions with an invalid network", async function () {
    expect(() => new SubgraphInteractions("spankchain")).to.throw(
      "Subgraph URL not found for network: spankchain"
    );
  });

  it("Should fetch user batches", async function () {
    expect(await toucan.fetchUserBatches(addr1.address)).to.not.throw;
  });

  describe("Testing TCO2 Token fetching methods", function () {
    it("Should fetch details about TCO2 based on its address", async function () {
      expect(
        await toucan.fetchTCO2TokenById(
          "0x0bebef6417a0200508f9bbae4c7108852f7c7ace"
        )
      ).to.not.throw;
    });

    it("Should fetch details about TCO2 based on its full symbol", async function () {
      expect(await toucan.fetchTCO2TokenByFullSymbol("TCO2-VCS-844-2017")).to
        .not.throw;
    });

    it("Should fetch all TCO2 Tokens", async function () {
      expect(await toucan.fetchAllTCO2Tokens()).to.not.throw;
    });
  });

  it("Should fetch bridged batch tokens", async function () {
    expect(await toucan.fetchBridgedBatchTokens()).to.not.throw;
  });

  it("Should fetch user retirements", async function () {
    expect(await toucan.fetchUserRetirements(addr1.address)).to.not.throw;
  });

  describe("Testing Redeems fetching methods", function () {
    it("Should fetch redeems", async function () {
      expect(await toucan.fetchRedeems("NCT")).to.not.throw;
    });

    it("Should fetch user redeems", async function () {
      expect(await toucan.fetchUserRedeems(addr1.address, "NCT")).to.not.throw;
    });
  });

  it("Should fetch pooled tokens", async function () {
    expect(await toucan.fetchPoolContents("NCT")).to.not.throw;
  });

  it("Should fetch a project by its id", async function () {
    expect(await toucan.fetchProjectById("1")).to.not.throw;
  });

  it("Should fetch aggregations", async function () {
    expect(await toucan.fetchAggregations()).to.not.throw;
  });

  xit("Should fetch price of BCT", async function () {
    expect(await toucan.fetchTokenPriceOnDex("BCT")).to.not.throw;
  });

  xit("Should fetch price of NCT", async function () {
    expect(await toucan.fetchTokenPriceOnDex("NCT")).to.not.throw;
  });
});
