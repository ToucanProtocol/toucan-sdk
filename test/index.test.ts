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

import { ToucanClient } from "../dist";
import { IToucanCarbonOffsets } from "../dist/typechain";
import { PoolSymbol } from "../dist/types";
import { poolTokenABI, swapperABI, tco2ABI } from "../dist/utils/ABIs";
import addresses from "../dist/utils/addresses";

const ONE_ETHER = parseEther("1.0");

describe("Testing Toucan-SDK contract interactions", function () {
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let toucan: ToucanClient;
  let swapper: Contract;

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

  before(async () => {
    [addr1, addr2] = await ethers.getSigners();
    toucan = new ToucanClient("polygon");
    toucan.setSigner(addr1);

    swapper = new ethers.Contract(addresses.polygon.swapper, swapperABI, addr1);
    await swapper.swap(addresses.polygon.nct, parseEther("100.0"), {
      value: await swapper.calculateNeededETHAmount(
        addresses.polygon.nct,
        parseEther("100.0")
      ),
    });
    await swapper.swap(addresses.polygon.bct, parseEther("100.0"), {
      value: await swapper.calculateNeededETHAmount(
        addresses.polygon.bct,
        parseEther("100.0")
      ),
    });
    await swapper.swap(addresses.polygon.weth, ONE_ETHER, {
      value: await swapper.calculateNeededETHAmount(
        addresses.polygon.weth,
        ONE_ETHER
      ),
    });
  });

  describe("Testing OffsetHelper related methods", function () {
    it("Should retire 1 TCO2 using pool token deposit", async function () {
      await toucan.autoOffsetUsingPoolToken("NCT", ONE_ETHER);
    });

    it("Should retire 1 TCO2 using swap token", async function () {
      const iface = new Interface(
        '[{"inputs":[{"internalType":"address","name":"childChainManager","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr2","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr2","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
      iface.format(FormatTypes.full);
      const weth = new ethers.Contract(addresses.polygon.weth, iface, addr1);

      await toucan.autoOffsetUsingSwapToken("NCT", ONE_ETHER, weth);
    });

    it("Should retire 1 TCO2 using ETH deposit", async function () {
      await toucan.autoOffsetUsingETH("NCT", ONE_ETHER);
    });
  });

  describe("Testing NCT related methods", function () {
    it("Should automatically redeem NCT", async function () {
      const nct = new ethers.Contract(
        addresses.polygon.nct,
        poolTokenABI,
        addr1
      );
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      await toucan.redeemAuto("NCT", ONE_ETHER);

      expect(formatEther(await nct.balanceOf(addr1.address))).to.be.eql(
        formatEther(nctBalanceBefore.sub(ONE_ETHER))
      );
    });

    it("Should automatically redeem NCT & return a correct array of TCO2s", async function () {
      const scoredTCO2s = await getFilteredScoredTCO2s("NCT");
      const tco2 = new ethers.Contract(scoredTCO2s[0], tco2ABI, addr1);
      const balanceBefore = await tco2.balanceOf(addr1.address);

      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);

      for (let i = 0; i < tco2s.length; i++) {
        const tco2 = new ethers.Contract(tco2s[i].address, tco2ABI, addr1);
        expect(formatEther(await tco2.balanceOf(addr1.address))).to.be.eql(
          formatEther((await tco2s[i].amount).add(balanceBefore))
        );
      }
    });

    it("Should selectively redeem NCT for the highest quality TCO2s", async function () {
      const nct = new ethers.Contract(
        addresses.polygon.nct,
        poolTokenABI,
        addr1
      );
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      const scoredTCO2sNCT = await getFilteredScoredTCO2s("NCT");

      const tco2Address = scoredTCO2sNCT[scoredTCO2sNCT.length - 1];

      const fees = await toucan.calculateRedeemFees(
        "NCT",
        [tco2Address],
        [ONE_ETHER]
      );

      await toucan.redeemMany("NCT", [tco2Address], [ONE_ETHER]);

      const tco2 = new ethers.Contract(tco2Address, tco2ABI, addr1);
      const balance = await tco2.balanceOf(addr1.address);
      expect(formatEther(balance)).to.be.eql(formatEther(ONE_ETHER.sub(fees)));

      expect(formatEther(await nct.balanceOf(addr1.address))).to.be.eql(
        formatEther(nctBalanceBefore.sub(ONE_ETHER))
      );
    });

    it("Should automatically redeem NCT & deposit the TCO2 back", async function () {
      const scoredTCO2s = await getFilteredScoredTCO2s("NCT");
      const tco2 = new ethers.Contract(
        scoredTCO2s[0],
        tco2ABI,
        addr1
      ) as IToucanCarbonOffsets;
      const tco2BalanceBefore = await tco2.balanceOf(addr1.address);
      const nct = new ethers.Contract(
        addresses.polygon.nct,
        poolTokenABI,
        addr1
      );
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      await toucan.redeemAuto("NCT", ONE_ETHER);

      await toucan.depositTCO2("NCT", ONE_ETHER, tco2.address);

      expect(formatEther(await tco2.balanceOf(addr1.address))).to.be.eql(
        formatEther(tco2BalanceBefore)
      );

      expect(formatEther(await nct.balanceOf(addr1.address))).to.be.eql(
        formatEther(nctBalanceBefore)
      );
    });
  });

  describe("Testing BCT related methods", function () {
    it("Should selectively redeem BCT for the highest quality TCO2s", async function () {
      const bct = new ethers.Contract(
        addresses.polygon.bct,
        poolTokenABI,
        addr1
      );
      const bctBalanceBefore = await bct.balanceOf(addr1.address);

      const scoredTCO2sBCT = await getFilteredScoredTCO2s("BCT");

      const tco2Address = scoredTCO2sBCT[scoredTCO2sBCT.length - 1];

      const fees = await toucan.calculateRedeemFees(
        "BCT",
        [tco2Address],
        [ONE_ETHER]
      );

      await toucan.redeemMany("BCT", [tco2Address], [ONE_ETHER]);

      const tco2 = new ethers.Contract(tco2Address, tco2ABI, addr1);
      const balance = await tco2.balanceOf(addr1.address);
      expect(formatEther(balance)).to.be.eql(formatEther(ONE_ETHER.sub(fees)));

      expect(formatEther(await bct.balanceOf(addr1.address))).to.be.eql(
        formatEther(bctBalanceBefore.sub(ONE_ETHER))
      );
    });

    it("Should automatically redeem BCT & deposit the TCO2 back", async function () {
      const scoredTCO2s = await getFilteredScoredTCO2s("BCT");
      const TCO2 = toucan.getTCO2Contract(scoredTCO2s[0]);
      const tco2BalanceBefore = await TCO2.balanceOf(addr1.address);
      const bct = toucan.getPoolContract("BCT");
      const bctBalanceBefore = await bct.balanceOf(addr1.address);

      await toucan.redeemAuto("BCT", ONE_ETHER);

      await toucan.depositTCO2("BCT", ONE_ETHER, TCO2.address);

      expect(formatEther(await TCO2.balanceOf(addr1.address))).to.be.eql(
        formatEther(tco2BalanceBefore)
      );

      expect(formatEther(await bct.balanceOf(addr1.address))).to.be.eql(
        formatEther(bctBalanceBefore)
      );
    });
  });

  describe("Testing Contract Registry related methods", function () {
    it("Should return true", async function () {
      const scoredTCO2s = await getFilteredScoredTCO2s("BCT");
      expect(await toucan.checkIfTCO2(scoredTCO2s[0])).to.be.eql(true);
    });

    it("Should return false", async function () {
      expect(await toucan.checkIfTCO2(addr1.address)).to.be.eql(false);
    });
  });

  describe("Testing TCO related methods", function () {
    it("Should retire 1 TCO2 & mint the certificate", async function () {
      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);

      await toucan.retireAndMintCertificate(
        "Test",
        addr1.address,
        "Test",
        "Test Message",
        ONE_ETHER,
        tco2s[0].address
      );

      // TODO check NFT ownership
    });

    it("Should retire 1 TCO2", async function () {
      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);

      const retirementReceipt = await toucan.retire(
        ONE_ETHER,
        tco2s[0].address
      );
      const retiredEvents = retirementReceipt.events?.filter((event) => {
        return event.event == "Retired";
      });

      // TODO why doesn't the retire method have any "Retired" events
      console.log("Retired events", retiredEvents);
    });

    it("Should retire 1 TCO2 from another address", async function () {
      const tco2s = await toucan.redeemAuto2("NCT", ONE_ETHER);

      const TCO2 = toucan.getTCO2Contract(tco2s[0].address);
      await TCO2.approve(addr2.address, ONE_ETHER);

      const toucan2 = new ToucanClient("polygon");
      toucan2.setSigner(addr2);

      await toucan2.retireFrom(ONE_ETHER, addr1.address, TCO2.address);
    });
  });
});
