import { expect } from "chai";
import OffsetHelperClient from "../ts";

describe("OffsetHelper SDK", function () {
  it("Should instantiate the offset helper", function () {
    const ohc = new OffsetHelperClient();

    expect(ohc.provider).to.be.eql(undefined);
  });
});
