import { expect } from "chai";
import OffsetHelperClient from "../ts";

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
});
