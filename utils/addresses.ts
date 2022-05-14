export interface IfcOneNetworksAddresses {
  bct: string;
  nct: string;
  offsetHelper: string;
}

export interface IfcAddresses {
  polygon: IfcOneNetworksAddresses;
  mumbai: IfcOneNetworksAddresses;
}

const addresses: IfcAddresses = {
  polygon: {
    bct: "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
    nct: "0xD838290e877E0188a4A44700463419ED96c16107",
    offsetHelper: "0xb334795bf50e4943d076Dfb38D8C1A50F9F5a101",
  },
  mumbai: {
    bct: "0xf2438A14f668b1bbA53408346288f3d7C71c10a1",
    nct: "0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E",
    offsetHelper: "0x3E0E589cBd008024Cd272418Ea44Dfc4940650d3",
  },
};

export default addresses;
