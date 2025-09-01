export interface INetworkTokenAddresses {
  bct: string;
  nct: string;
  offsetHelper: string;
  swapper: string;
  weth: string;
  toucanContractRegistry: string;
}

const addresses: Record<string, INetworkTokenAddresses> = {
  celo: {
    bct: "0x0CcB0071e8B8B716A2a5998aB4d97b83790873Fe",
    nct: "0x02De4766C272abc10Bc88c220D214A26960a7e92",
    offsetHelper: "0x4242829D15434Fea6606CF995f1BEd68a18C37d1",
    weth: "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
    swapper: "0x7B99c68012F78f9D15BA9EA4121aB3e09914Be70",
    toucanContractRegistry: "0xa30589F50b9641dacCB98AA2B4A8F24739c5B007",
  },
  alfajores: {
    bct: "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb",
    nct: "0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5",
    offsetHelper: "0x0CcB0071e8B8B716A2a5998aB4d97b83790873Fe",
    weth: "",
    swapper: "0xa12A728656Fbc82dC25515b548b328E63B556572",
    toucanContractRegistry: "0x48E04110aa4691ec3E9493187e6e9A3dB613e6e4",
  },
  polygon: {
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    nct: "0xd838290e877e0188a4a44700463419ed96c16107",
    offsetHelper: "0x7cB7C0484d4F2324F51d81E2368823c20AEf8072",
    swapper: "0xfca57EE8B62d8e4b9792bd68095c2520723c306d",
    weth: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    toucanContractRegistry: "0x263fa1c180889b3a3f46330f32a4a23287e99fc9",
  },
};

export default addresses;
