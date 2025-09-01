// Explicit import of hardhat plugins are required to obtain type extensions
// when compiling without hardhat.config.ts.
import "@nomiclabs/hardhat-ethers";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { before, describe, it } from "mocha";

import ToucanClient from "../src";
import ContractInteractions from "../src/subclasses/ContractInteractions";
import { ERC20__factory } from "../src/typechain/protocol/factories/@openzeppelin/contracts/token/ERC20/ERC20__factory";
import { PoolSymbol } from "../src/types";
import { swapperABI } from "../src/utils/ABIs";
import addresses from "../src/utils/addresses";

const ONE_ETHER = parseEther("1.0");

describe("Testing Toucan-SDK contract interactions", function () {
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let toucan: ToucanClient;
  let swapper: Contract;
  // change these two variables when testing the different networks
  const network = addresses.polygon;
  const networkName = "polygon";

  /**
   *
   * @param poolSymbol Pool symbol to get scored TCO2s for
   * @returns an array of addresses representing TCO2s in the given pool that have a balance > 0.0
   */
  const getFilteredScoredTCO2s = async (
    poolSymbol: PoolSymbol
  ): Promise<string[]> => {
    const scoredTCO2s = await toucan.getScoredTCO2s(poolSymbol);
    const pool = toucan.getPoolContract(poolSymbol);
    return await asyncFilter(scoredTCO2s, async (tco2Address: string) => {
      const tokenBalance: BigNumber = await pool["tokenBalances"](tco2Address);
      return tokenBalance.gt(parseEther("0.0"));
    });
  };

  const asyncFilter = async (
    arr: string[],
    predicate: (tco2Address: string) => Promise<boolean>
  ) =>
    Promise.all(arr.map(predicate)).then((results) =>
      arr.filter((_el, index) => results[index])
    );

  /**
   *
   * @description checks whether you can redeem 1 TCO2 and returns the amount of redeemable TCO2
   * @dev this exists because when redeeming you might end up attempting to redeem more than the balance of the first
   * scored TCO2 if using a hardcoded redeem amount
   * @param poolSymbol pool to get dynamic redeem amount for
   * @param tco2Quality quality of the TCO2 to redeem
   * @returns BigNumber representing the amount of TCO2 you can redeem safely
   */
  const getDynamicRedeemAmount = async (
    poolSymbol: PoolSymbol,
    tco2Quality: "low" | "high"
  ): Promise<{ tco2Address: string; amountToRedeem: BigNumber }> => {
    const scoredTCO2s = await getFilteredScoredTCO2s(poolSymbol);
    const tco2Address =
      tco2Quality == "low"
        ? scoredTCO2s[0]
        : scoredTCO2s[scoredTCO2s.length - 1];
    const tco2 = toucan.getTCO2Contract(tco2Address);
    const pool = toucan.getPoolContract(poolSymbol);
    const balance = (await tco2.balanceOf(pool.address)) as BigNumber;
    return {
      tco2Address,
      amountToRedeem: balance.gt(ONE_ETHER) ? ONE_ETHER : balance,
    };
  };

  before(async () => {
    [addr1, addr2] = await ethers.getSigners();

    toucan = new ToucanClient(networkName, addr1);

    swapper = new ethers.Contract(network.swapper, swapperABI, addr1);
    await swapper.swap(network.nct, parseEther("100.0"), {
      value: await swapper.calculateNeededETHAmount(
        network.nct,
        parseEther("100.0")
      ),
    });
    await swapper.swap(network.bct, parseEther("100.0"), {
      value: await swapper.calculateNeededETHAmount(
        network.bct,
        parseEther("100.0")
      ),
    });
    const weth = ERC20__factory.connect(network.weth, addr1);
    await weth.approve(swapper.address, ONE_ETHER);
    await swapper.swap(network.weth, ONE_ETHER, {
      value: await swapper.calculateNeededETHAmount(network.weth, ONE_ETHER),
    });
  });

  it("Should fail to initialize ContractInteractions with an invalid network", async function () {
    expect(() => new ContractInteractions("spankchain")).to.throw(
      "Unknown network: spankchain"
    );
  });

  describe("Testing OffsetHelper related methods", function () {
    it("Should retire 1 TCO2 using pool token #autoOffsetPoolToken", async function () {
      const pool = await toucan.getPoolContract("NCT");

      const state: Array<{
        nctSupply: BigNumber;
        nctBalance: BigNumber;
      }> = [];
      state.push({
        nctSupply: await pool.totalSupply(),
        nctBalance: await pool.balanceOf(addr1.address),
      });

      await toucan.autoOffsetPoolToken("NCT", ONE_ETHER);

      state.push({
        nctSupply: await pool.totalSupply(),
        nctBalance: await pool.balanceOf(addr1.address),
      });

      expect(
        formatEther(state[0].nctSupply.sub(ONE_ETHER)),
        "Expect NCT supply to be less by 1.0"
      ).to.be.equal(formatEther(state[1].nctSupply));

      expect(
        formatEther(state[0].nctBalance.sub(ONE_ETHER)),
        "Expect addr1's NCT balance to be less by 1.0"
      ).to.be.equal(formatEther(state[1].nctBalance));
    });

    it("Should retire 1 TCO2 using swap token #autoOffsetExactInToken", async function () {
      const weth = ERC20__factory.connect(network.weth, addr1);
      const pool = await toucan.getPoolContract("NCT");

      const state: Array<{
        nctSupply: BigNumber;
        wethBalance: BigNumber;
      }> = [];
      state.push({
        nctSupply: await pool.totalSupply(),
        wethBalance: await weth.balanceOf(addr1.address),
      });

      const cost = await toucan.calculateExpectedPoolTokenForToken(
        weth.address,
        "NCT",
        ONE_ETHER
      );

      await toucan.autoOffsetExactInToken(network.weth, "NCT", ONE_ETHER);

      state.push({
        nctSupply: await pool.totalSupply(),
        wethBalance: await weth.balanceOf(addr1.address),
      });

      expect(
        formatEther(state[0].nctSupply.sub(cost)),
        `Expect NCT supply to be less by ${formatEther(cost)}`
      ).to.be.equal(formatEther(state[1].nctSupply));

      expect(
        formatEther(state[0].wethBalance.sub(ONE_ETHER)),
        `Expect addr1's WETH balance to be less by 1.0`
      ).to.be.equal(formatEther(state[1].wethBalance));
    });

    it("Should retire 1 TCO2 using ETH (native token) #autoOffsetExactInETH)", async function () {
      const pool = await toucan.getPoolContract("NCT");

      const state: Array<{
        nctSupply: BigNumber;
        nativeTokenBalance: BigNumber | any;
      }> = [];
      state.push({
        nctSupply: await pool.totalSupply(),
        nativeTokenBalance: await addr1.getBalance(),
      });

      const cost = await toucan.calculateExpectedPoolTokenForETH(
        "NCT",
        ONE_ETHER
      );

      await toucan.autoOffsetExactInETH("NCT", ONE_ETHER);

      state.push({
        nctSupply: await pool.totalSupply(),
        nativeTokenBalance: await addr1.getBalance(),
      });

      expect(
        parseInt(state[0].nativeTokenBalance.sub(cost)),
        `Expect native token, e.g., MATIC supply to be less by ${formatEther(
          ONE_ETHER
        )}`
      )
        .to.be.greaterThanOrEqual(parseInt(state[1].nativeTokenBalance))
        .and.to.be.lessThan(parseInt(state[0].nativeTokenBalance));

      expect(
        formatEther(state[0].nctSupply.sub(cost)),
        `Expect NCT supply to be less by ${formatEther(cost)}`
      ).to.be.equal(formatEther(state[1].nctSupply));
    });

    it("Should retire 1 TCO2 using ETH (native token) #autoOffsetExactOutETH)", async function () {
      const pool = await toucan.getPoolContract("NCT");

      const state: Array<{
        nctSupply: BigNumber;
        nativeTokenBalance: BigNumber | any;
      }> = [];
      state.push({
        nctSupply: await pool.totalSupply(),
        nativeTokenBalance: await addr1.getBalance(),
      });

      const cost = await toucan.calculateNeededETHAmount("NCT", ONE_ETHER);

      await toucan.autoOffsetExactOutETH("NCT", ONE_ETHER);

      state.push({
        nctSupply: await pool.totalSupply(),
        nativeTokenBalance: await addr1.getBalance(),
      });

      expect(
        parseInt(state[0].nativeTokenBalance.sub(cost)),
        `Expect native token, e.g., MATIC supply to be less by ${formatEther(
          cost
        )}`
      )
        .to.be.greaterThanOrEqual(parseInt(state[1].nativeTokenBalance))
        .and.to.be.lessThan(parseInt(state[0].nativeTokenBalance));

      expect(
        formatEther(state[0].nctSupply.sub(ONE_ETHER)),
        `Expect NCT supply to be less by ${formatEther(ONE_ETHER)}`
      ).to.be.equal(formatEther(state[1].nctSupply));
    });
  });

  describe("Testing NCT related methods", function () {
    it("Should automatically redeem NCT", async function () {
      const nct = toucan.getPoolContract("NCT");
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      await toucan.redeemAuto("NCT", ONE_ETHER);

      expect(
        formatEther(await nct.balanceOf(addr1.address)),
        "Expect addr1 to have 1.0 less NCT"
      ).to.be.eql(formatEther(nctBalanceBefore.sub(ONE_ETHER)));
    });

    it("Should automatically redeem NCT & return a correct array of TCO2s", async function () {
      const { tco2Address, amountToRedeem } = await getDynamicRedeemAmount(
        "NCT",
        "low"
      );

      const expectedTco2s: {
        address: string;
        amount: BigNumber;
      }[] = [{ address: tco2Address, amount: amountToRedeem }];

      const tco2s = await toucan.redeemAuto("NCT", amountToRedeem);

      expect(tco2s, "Expect returned TCO2s to match").to.be.eql(expectedTco2s);
    });

    it("Should selectively redeem NCT for the highest quality TCO2s", async function () {
      const { tco2Address, amountToRedeem } = await getDynamicRedeemAmount(
        "NCT",
        "high"
      );

      const nct = toucan.getPoolContract("NCT");
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      const tco2 = toucan.getTCO2Contract(tco2Address);

      const fees = await toucan.calculateRedeemFees(
        "NCT",
        [tco2Address],
        [amountToRedeem]
      );
      await toucan.redeemMany("NCT", [tco2Address], [amountToRedeem]);

      const balance = await tco2.balanceOf(addr1.address);

      expect(
        formatEther(balance),
        `Expect addr1 to have ${formatEther(
          amountToRedeem
        )}  minus fees ${formatEther(fees)} of the TCO2 (${tco2Address})`
      ).to.be.eql(formatEther(amountToRedeem.sub(fees)));
      expect(
        formatEther(await nct.balanceOf(addr1.address)),
        `Expect addr1 to have ${formatEther(amountToRedeem)} less NCT`
      ).to.be.eql(formatEther(nctBalanceBefore.sub(amountToRedeem)));
    });

    it("Should automatically redeem NCT & deposit the TCO2 back", async function () {
      const { tco2Address, amountToRedeem } = await getDynamicRedeemAmount(
        "NCT",
        "low"
      );

      const nct = toucan.getPoolContract("NCT");
      const tco2 = toucan.getTCO2Contract(tco2Address);

      const tco2BalanceBefore = await tco2.balanceOf(addr1.address);
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      await toucan.redeemAuto("NCT", amountToRedeem);
      await toucan.depositTCO2("NCT", amountToRedeem, tco2.address);

      expect(
        formatEther(await tco2.balanceOf(addr1.address)),
        `Expect addr1 to have the same amount of TCO2`
      ).to.be.eql(formatEther(tco2BalanceBefore));
      expect(
        formatEther(await nct.balanceOf(addr1.address)),
        `Expect addr1 to have the same amount of NCT`
      ).to.be.eql(formatEther(nctBalanceBefore));
    });
  });

  describe("Testing Contract Registry related methods", function () {
    it("Should return true", async function () {
      const scoredTCO2s = await getFilteredScoredTCO2s("NCT");
      expect(await toucan.checkIfTCO2(scoredTCO2s[0])).to.be.eql(true);
    });

    it("Should return false", async function () {
      expect(await toucan.checkIfTCO2(addr1.address)).to.be.eql(false);
    });
  });

  describe("Testing TCO2 related methods", function () {
    it("Should retire TCO2 & mint the certificate", async function () {
      const tco2s = await toucan.redeemAuto("NCT", ONE_ETHER);
      const { address, amount } = tco2s[0];
      const tco2 = toucan.getTCO2Contract(address);

      const state: Array<{
        tco2Supply: BigNumber;
        tco2Balance: BigNumber;
      }> = [];
      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      await toucan.retireAndMintCertificate(
        "Test",
        addr1.address,
        "Test",
        "Test Message",
        amount,
        address
      );

      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      expect(
        state[0].tco2Supply.sub(amount),
        `Expect there to be ${amount} less of the TCO2 ${address} in total supply`
      ).to.be.eql(state[1].tco2Supply);
      expect(
        state[0].tco2Balance.sub(amount),
        `Expect addr1 to have ${amount} less of the TCO2 ${address}`
      ).to.be.eql(state[1].tco2Balance);
    });

    it("Should retire TCO2", async function () {
      const tco2s = await toucan.redeemAuto("NCT", ONE_ETHER);
      const { address, amount } = tco2s[0];
      const tco2 = toucan.getTCO2Contract(address);

      const state: Array<{
        tco2Supply: BigNumber;
        tco2Balance: BigNumber;
      }> = [];
      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      await toucan.retire(amount, address);

      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      expect(
        state[0].tco2Supply.sub(amount),
        `Expect there to be ${amount} less of the TCO2 ${address} in total supply`
      ).to.be.eql(state[1].tco2Supply);
      expect(
        state[0].tco2Balance.sub(amount),
        `Expect addr1 to have ${amount} less of the TCO2 ${address}`
      ).to.be.eql(state[1].tco2Balance);
    });

    it("Should retire TCO2 for another address", async function () {
      const tco2s = await toucan.redeemAuto("NCT", ONE_ETHER);
      const { address, amount } = tco2s[0];
      const tco2 = toucan.getTCO2Contract(address);

      const state: Array<{
        tco2Supply: BigNumber;
        tco2Balance: BigNumber;
      }> = [];
      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      await tco2.approve(addr2.address, amount);

      const toucan2 = new ToucanClient(networkName, addr2);

      await toucan2.retireFrom(amount, addr1.address, address);

      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      expect(
        state[0].tco2Supply.sub(amount),
        `Expect there to be ${amount} less of the TCO2 ${address} in total supply`
      ).to.be.eql(state[1].tco2Supply);
      expect(
        state[0].tco2Balance.sub(amount),
        `Expect addr1 to have ${amount} less of the TCO2 ${address}`
      ).to.be.eql(state[1].tco2Balance);
    });
  });
});
