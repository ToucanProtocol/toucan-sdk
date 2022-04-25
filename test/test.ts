import { expect } from "chai";
import { BigNumber, ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import OffsetHelperClient from "../ts";
import addresses from "../ts/utils/addresses";
import ABIs from "../ts/utils/ABIs";

describe("OffsetHelper SDK", function () {
  it("Should instantiate the offset helper", function () {
    const ohc = new OffsetHelperClient();

    expect(ohc.provider).to.be.eql(undefined);
  });

  it("Should connect a default rpc url", function () {
    const ohc = new OffsetHelperClient();

    ohc.connectRpc();

    expect(ohc.provider).to.not.be.eql(undefined);
  });

  it("Wallet should have 1 less TCO2", async function () {
    this.timeout(65000);

    const ohc = new OffsetHelperClient();

    ohc.connectRpc(
      process.env.MY_ADDRESS,
      process.env.MY_PRIVATE_KEY,
      process.env.MY_NODE_URL
    );

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NODE_API_RPC_URL || ""
    );
    const signer = new ethers.Wallet(
      process.env.MY_PRIVATE_KEY || "",
      provider
    );

    const nct = new ethers.Contract(addresses.mumbai.nct, ABIs.erc20, signer);

    const balanceBefore: BigNumber = await nct.balanceOf(
      process.env.MY_ADDRESS
    );

    const offset = await ohc.autoOffset("NCT", "1.0", "mumbai");
    if (offset instanceof Error) return;

    const balanceAfter: BigNumber = await await nct.balanceOf(
      process.env.MY_ADDRESS
    );

    const balanceDifference = balanceBefore.sub(balanceAfter);

    expect(formatEther(balanceDifference)).to.be.eql("1.0");
  });
});
