import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

import OffsetHelperClient from "..";
import { swapperABI } from "../utils/ABIs";
import addresses from "../utils/addresses";

describe("Testing Toucan-SDK", function () {
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let oh: OffsetHelperClient;
  let swapper: Contract;

  before(async () => {
    [addr1, addr2, ...addrs] = await ethers.getSigners();
    oh = new OffsetHelperClient(
      "polygon",
      addr1.address,
      ethers.provider,
      addr1
    );
  });

  describe("Testing OffsetHelper related methods", function () {
    it("Should retire 1 TCO2", async function () {
      swapper = new ethers.Contract(
        addresses.polygon.swapper,
        swapperABI,
        addr1
      );
      await swapper.swap(addresses.polygon.nct, parseEther("10.0"), {
        value: await swapper.howMuchETHShouldISendToSwap(
          addresses.polygon.nct,
          parseEther("10.0")
        ),
      });

      await expect(oh.autoOffset("NCT", "1.0")).to.not.be.reverted;
    });
  });
});
