require("dotenv").config();

interface IfcOneNetworksAddresses {
  bct: string;
  nct: string;
  offsetHelper: string;
}

interface IfcAddresses {
  polygon: IfcOneNetworksAddresses;
  mumbai: IfcOneNetworksAddresses;
}

const addresses: IfcAddresses = {
  polygon: {
    bct: "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
    nct: "0xD838290e877E0188a4A44700463419ED96c16107",
    offsetHelper: process.env.OFFSET_HELPER_ADDRESS || "",
  },
  mumbai: {
    bct: "0xf2438A14f668b1bbA53408346288f3d7C71c10a1",
    nct: "0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E",
    offsetHelper: process.env.OFFSET_HELPER_ADDRESS || "",
  },
};

export default addresses;
