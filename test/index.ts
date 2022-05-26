import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { FormatTypes, Interface, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

import ToucanClient from "..";
import { IToucanCarbonOffsets } from "../typechain";
import { poolTokenABI, swapperABI, tco2ABI } from "../utils/ABIs";
import addresses from "../utils/addresses";

describe("Testing Toucan-SDK", function () {
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let toucan: ToucanClient;
  let swapper: Contract;
  let scoredTCO2sBCT: string[];
  let scoredTCO2sNCT: string[];

  before(async () => {
    [addr1, addr2, ...addrs] = await ethers.getSigners();
    toucan = new ToucanClient("polygon", addr1.address, ethers.provider, addr1);

    swapper = new ethers.Contract(addresses.polygon.swapper, swapperABI, addr1);
    await swapper.swap(addresses.polygon.nct, parseEther("100.0"), {
      value: await swapper.howMuchETHShouldISendToSwap(
        addresses.polygon.nct,
        parseEther("100.0")
      ),
    });
    await swapper.swap(addresses.polygon.bct, parseEther("100.0"), {
      value: await swapper.howMuchETHShouldISendToSwap(
        addresses.polygon.bct,
        parseEther("100.0")
      ),
    });
    await swapper.swap(addresses.polygon.weth, parseEther("1.0"), {
      value: await swapper.howMuchETHShouldISendToSwap(
        addresses.polygon.weth,
        parseEther("1.0")
      ),
    });

    scoredTCO2sNCT = await toucan.getScoredTCO2s("NCT");
    scoredTCO2sBCT = await toucan.getScoredTCO2s("BCT");
  });

  describe("Testing OffsetHelper related methods", function () {
    it("Should retire 1 TCO2 using pool token deposit", async function () {
      await expect(toucan.autoOffsetUsingPoolToken("NCT", parseEther("1.0"))).to
        .not.be.reverted;
    });

    it("Should retire 1 TCO2 using swap token", async function () {
      const iface = new Interface(
        '[{"inputs":[{"internalType":"address","name":"childChainManager","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr2","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr2","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
      iface.format(FormatTypes.full);
      const weth = new ethers.Contract(addresses.polygon.weth, iface, addr1);

      await expect(
        toucan.autoOffsetUsingSwapToken("NCT", parseEther("1.0"), weth)
      ).to.not.be.reverted;
    });

    it("Should retire 1 TCO2 using ETH deposit", async function () {
      await expect(toucan.autoOffsetUsingETH("NCT", parseEther("1.0"))).to.not
        .be.reverted;
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

      await expect(toucan.redeemAuto("NCT", parseEther("1.0"))).to.not.be
        .reverted;

      expect(await nct.balanceOf(addr1.address)).to.be.eql(
        nctBalanceBefore.sub(parseEther("1.0"))
      );
    });

    it("Should automatically redeem NCT & return a correct array of TCO2s", async function () {
      const tco2 = new ethers.Contract(scoredTCO2sNCT[0], tco2ABI, addr1);
      const balanceBefore = await tco2.balanceOf(addr1.address);

      const tco2s = await toucan.redeemAuto2("NCT", parseEther("1.0"));

      for (let i = 0; i < tco2s.length; i++) {
        const tco2 = new ethers.Contract(tco2s[i].address, tco2ABI, addr1);
        expect(await tco2.balanceOf(addr1.address)).to.be.eql(
          (await tco2s[i].amount).add(balanceBefore)
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

      const tco2Address = scoredTCO2sNCT[scoredTCO2sNCT.length - 1];

      const fees = await toucan.calculateRedeemFees(
        "NCT",
        [tco2Address],
        [parseEther("1.0")]
      );

      await expect(toucan.redeemMany("NCT", [tco2Address], [parseEther("1.0")]))
        .to.not.be.reverted;

      const tco2 = new ethers.Contract(tco2Address, tco2ABI, addr1);
      const balance = await tco2.balanceOf(addr1.address);
      expect(balance).to.be.eql(parseEther("1.0").sub(fees));

      expect(await nct.balanceOf(addr1.address)).to.be.eql(
        nctBalanceBefore.sub(parseEther("1.0"))
      );
    });

    it("Should automatically redeem NCT & deposit the TCO2 back", async function () {
      // @ts-ignore
      const tco2: IToucanCarbonOffsets = new ethers.Contract(
        scoredTCO2sNCT[0],
        tco2ABI,
        addr1
      );
      const tco2BalanceBefore = await tco2.balanceOf(addr1.address);
      const nct = new ethers.Contract(
        addresses.polygon.nct,
        poolTokenABI,
        addr1
      );
      const nctBalanceBefore = await nct.balanceOf(addr1.address);

      await toucan.redeemAuto("NCT", parseEther("1.0"));

      await expect(toucan.depositTCO2("NCT", parseEther("1.0"), tco2)).to.not.be
        .reverted;

      expect(await tco2.balanceOf(addr1.address)).to.be.eql(tco2BalanceBefore);

      expect(await nct.balanceOf(addr1.address)).to.be.eql(nctBalanceBefore);
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

      const tco2Address = scoredTCO2sBCT[scoredTCO2sBCT.length - 1];

      const fees = await toucan.calculateRedeemFees(
        "BCT",
        [tco2Address],
        [parseEther("1.0")]
      );

      // @ts-ignore tokenBalances is an autogenerated getter for a mapping within inherited storage
      const remainingTCO2 = await toucan.bct.tokenBalances(tco2Address);
      console.log("remainingTCO2", remainingTCO2);

      // await expect(
      await toucan.redeemMany("BCT", [tco2Address], [parseEther("1.0")]);
      // .to.not.be.reverted;
      return;

      const tco2 = new ethers.Contract(tco2Address, tco2ABI, addr1);
      const balance = await tco2.balanceOf(addr1.address);
      expect(balance).to.be.eql(parseEther("1.0").sub(fees));

      expect(await bct.balanceOf(addr1.address)).to.be.eql(
        bctBalanceBefore.sub(parseEther("1.0"))
      );
    });

    it("Should automatically redeem BCT & deposit the TCO2 back", async function () {
      // @ts-ignore
      const tco2: IToucanCarbonOffsets = new ethers.Contract(
        scoredTCO2sBCT[0],
        tco2ABI,
        addr1
      );
      const tco2BalanceBefore = await tco2.balanceOf(addr1.address);
      const bct = new ethers.Contract(
        addresses.polygon.bct,
        poolTokenABI,
        addr1
      );
      const bctBalanceBefore = await bct.balanceOf(addr1.address);

      await toucan.redeemAuto("BCT", parseEther("1.0"));

      // await expect(
      await toucan.depositTCO2("BCT", parseEther("1.0"), tco2);
      // .to.not.be
      //   .reverted;

      expect(await tco2.balanceOf(addr1.address)).to.be.eql(tco2BalanceBefore);

      expect(await bct.balanceOf(addr1.address)).to.be.eql(bctBalanceBefore);
    });
  });

  describe("Testing Contract Registry related methods", function () {
    it("Should return true", async function () {
      expect(await toucan.checkIfTCO2(scoredTCO2sBCT[0])).to.be.eql(true);
    });

    it("Should return false", async function () {
      expect(await toucan.checkIfTCO2(addr1.address)).to.be.eql(false);
    });
  });
});
