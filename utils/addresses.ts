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
    bct: "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
    nct: "0xD838290e877E0188a4A44700463419ED96c16107",
    offsetHelper: "0x7229F708d2d1C29b1508E35695a3070F55BbA479",
    swapper: "0x5c48019F480a96AE5e963D0D1cDC673fd52A02D4",
    weth: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    toucanContractRegistry: "0x263fA1c180889b3a3f46330F32a4a23287E99FC9",
  },
  mumbai: {
    bct: "0xf2438A14f668b1bbA53408346288f3d7C71c10a1",
    nct: "0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E",
    offsetHelper: "0xE0a1D62C84f7Ca4611C0ada6cfC3E9187a7A97e6",
    swapper: "0xA84adeb585e95D2206735910Cdb2774CCdaD8b99",
    weth: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
    toucanContractRegistry: "0x6739D490670B2710dc7E79bB12E455DE33EE1cb6",
  },
};

export default addresses;
