import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import {
  formatEther,
  FormatTypes,
  Interface,
  parseEther,
} from "ethers/lib/utils";
import { ethers } from "hardhat";

import ToucanClient from "../dist";
import { PoolSymbol } from "../dist/types";
import { swapperABI } from "../dist/utils/ABIs";
import addresses from "../dist/utils/addresses";

const ONE_ETHER = parseEther("1.0");

describe("Testing Toucan-SDK contract interactions", function () {
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let toucan: ToucanClient;
  let swapper: Contract;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://matic-mainnet.chainstacklabs.com"
  );
  // change these three variables when testing the different networks
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

    toucan = new ToucanClient(networkName);
    toucan.setProvider(provider);
    toucan.setSigner(addr1);

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
    await swapper.swap(network.weth, ONE_ETHER, {
      value: await swapper.calculateNeededETHAmount(network.weth, ONE_ETHER),
    });
  });

  describe.skip("Testing OffsetHelper related methods", function () {
    it("Should retire 1 TCO2 using pool token deposit", async function () {
      const pool = await toucan.getPoolContract("NCT");

      const state: any[] = [];
      state.push({
        nctSupply: await pool.totalSupply(),
        nctBalance: await pool.balanceOf(addr1.address),
      });

      await toucan.autoOffsetUsingPoolToken("NCT", ONE_ETHER);

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

    it("Should retire 1 TCO2 using swap token", async function () {
      const iface = new Interface(
        '[{"inputs":[{"internalType":"address","name":"childChainManager","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr2","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr2","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
      iface.format(FormatTypes.full);
      const weth = new ethers.Contract(network.weth, iface, addr1);
      const pool = await toucan.getPoolContract("NCT");

      const state: any[] = [];
      state.push({
        nctSupply: await pool.totalSupply(),
        wethBalance: await weth.balanceOf(addr1.address),
      });

      const cost = await toucan.calculateNeededTokenAmount(
        "NCT",
        ONE_ETHER,
        weth
      );
      await toucan.autoOffsetUsingSwapToken("NCT", ONE_ETHER, weth);

      state.push({
        nctSupply: await pool.totalSupply(),
        wethBalance: await weth.balanceOf(addr1.address),
      });

      expect(
        formatEther(state[0].nctSupply.sub(ONE_ETHER)),
        `Expect NCT supply to be less by 1.0`
      ).to.be.equal(formatEther(state[1].nctSupply));

      expect(
        formatEther(state[0].wethBalance.sub(cost)),
        `Expect addr1's WETH balance to be less by ${formatEther(cost)}`
      ).to.be.equal(formatEther(state[1].wethBalance));
    });

    it("Should retire 1 TCO2 using ETH deposit", async function () {
      const pool = await toucan.getPoolContract("NCT");

      const state: any[] = [];
      state.push({
        nctSupply: await pool.totalSupply(),
      });

      await toucan.autoOffsetUsingETH("NCT", ONE_ETHER);

      state.push({
        nctSupply: await pool.totalSupply(),
      });

      expect(
        formatEther(state[0].nctSupply.sub(ONE_ETHER)),
        `Expect NCT supply to be less by 1.0`
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

      const tco2s = await toucan.redeemAuto2("NCT", amountToRedeem);

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

  xdescribe("Testing BCT related methods", function () {
    it("Should selectively redeem BCT for the highest quality TCO2s", async function () {
      const { tco2Address, amountToRedeem } = await getDynamicRedeemAmount(
        "NCT",
        "high"
      );

      const bct = toucan.getPoolContract("BCT");
      const bctBalanceBefore = await bct.balanceOf(addr1.address);
      const tco2 = toucan.getTCO2Contract(tco2Address);

      const fees = await toucan.calculateRedeemFees(
        "BCT",
        [tco2Address],
        [amountToRedeem]
      );
      await toucan.redeemMany("BCT", [tco2Address], [amountToRedeem]);

      const balance = await tco2.balanceOf(addr1.address);

      expect(
        formatEther(balance),
        `Expect addr1 to have ${formatEther(
          amountToRedeem
        )}  minus fees ${formatEther(fees)} of the TCO2 (${tco2Address})`
      ).to.be.eql(formatEther(amountToRedeem.sub(fees)));
      expect(
        formatEther(await bct.balanceOf(addr1.address)),
        `Expect addr1 to have ${formatEther(amountToRedeem)} less BCT`
      ).to.be.eql(formatEther(bctBalanceBefore.sub(amountToRedeem)));
    });

    it("Should automatically redeem BCT & deposit the TCO2 back", async function () {
      const { tco2Address, amountToRedeem } = await getDynamicRedeemAmount(
        "BCT",
        "low"
      );

      const bct = toucan.getPoolContract("BCT");
      const tco2 = toucan.getTCO2Contract(tco2Address);

      const tco2BalanceBefore = await tco2.balanceOf(addr1.address);
      const bctBalanceBefore = await bct.balanceOf(addr1.address);

      await toucan.redeemAuto("BCT", amountToRedeem);
      await toucan.depositTCO2("BCT", amountToRedeem, tco2.address);

      expect(
        formatEther(await tco2.balanceOf(addr1.address)),
        `Expect addr1 to have the same amount of TCO2`
      ).to.be.eql(formatEther(tco2BalanceBefore));
      expect(
        formatEther(await bct.balanceOf(addr1.address)),
        `Expect addr1 to have the same amount of BCT`
      ).to.be.eql(formatEther(bctBalanceBefore));
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

  describe("Testing TCO related methods", function () {
    it("Should retire TCO2 & mint the certificate", async function () {
      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);
      const { address, amount } = tco2s[0];
      const tco2 = toucan.getTCO2Contract(address);

      const state: any[] = [];
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
      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);
      const { address, amount } = tco2s[0];
      const tco2 = toucan.getTCO2Contract(address);

      const state: any[] = [];
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
      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);
      const { address, amount } = tco2s[0];
      const tco2 = toucan.getTCO2Contract(address);

      const state: any[] = [];
      state.push({
        tco2Supply: await tco2.totalSupply(),
        tco2Balance: await tco2.balanceOf(addr1.address),
      });

      await tco2.approve(addr2.address, amount);

      const toucan2 = new ToucanClient(networkName);
      toucan2.setSigner(addr2);

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
