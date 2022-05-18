export interface IfcOneNetworksAddresses {
  bct: string;
  nct: string;
  offsetHelper: string;
  swapper: string;
}

export interface IfcAddresses {
  polygon: IfcOneNetworksAddresses;
  mumbai: IfcOneNetworksAddresses;
}

const addresses: IfcAddresses = {
  polygon: {
    bct: "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
    nct: "0xD838290e877E0188a4A44700463419ED96c16107",
    offsetHelper: "0x2E730e699D6c5A9F7dF40E6D7cbB82638d56dF6B",
    swapper: "0x5c48019F480a96AE5e963D0D1cDC673fd52A02D4",
  },
  mumbai: {
    bct: "0xf2438A14f668b1bbA53408346288f3d7C71c10a1",
    nct: "0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E",
    offsetHelper: "0x1b5e0afaDAcC6D4631C94bF35D3e3F4d60ad8323",
    swapper: "0xA84adeb585e95D2206735910Cdb2774CCdaD8b99",
  },
};

export default addresses;
