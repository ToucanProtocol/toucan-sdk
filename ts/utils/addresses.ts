interface IfcAddresses {
  bct: string;
  nct: string;
  offsetHelper: string;
}

const addresses: IfcAddresses = {
  bct: "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
  nct: "0xD838290e877E0188a4A44700463419ED96c16107",
  offsetHelper: process.env.OFFSET_HELPER_ADDRESS || "",
};

export default addresses;
