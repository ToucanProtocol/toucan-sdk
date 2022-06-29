export interface IfcOneNetworksAddresses {
  bct: string;
  nct: string;
  offsetHelper: string;
  swapper: string;
  weth: string;
  toucanContractRegistry: string;
}

export interface IfcAddresses {
  polygon: IfcOneNetworksAddresses;
  mumbai: IfcOneNetworksAddresses;
}

const addresses: IfcAddresses = {
  polygon: {
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    nct: "0xd838290e877e0188a4a44700463419ed96c16107",
    offsetHelper: "0xFAFcCd01C395e4542BEed819De61f02f5562fAEa",
    swapper: "0x1C7f2CCa1Cd52Aae8A25B7BA4b7800c153F48D70",
    weth: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    toucanContractRegistry: "0x263fa1c180889b3a3f46330f32a4a23287e99fc9",
  },
  mumbai: {
    bct: "0xf2438a14f668b1bba53408346288f3d7c71c10a1",
    nct: "0x7becba11618ca63ead5605de235f6dd3b25c530e",
    offsetHelper: "0x30dC279166DCFB69F52C91d6A3380dCa75D0fCa7",
    swapper: "0xDd052AcA9AC1492a8b4F1432B68f11989903dE4d",
    weth: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
    toucanContractRegistry: "0x6739d490670b2710dc7e79bb12e455de33ee1cb6",
  },
};

export default addresses;
