/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  IToucanCarbonOffsetsTest,
  IToucanCarbonOffsetsTestInterface,
} from '../../../../contracts/testing/PoolComposabilityTest.sol/IToucanCarbonOffsetsTest';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'retire',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export class IToucanCarbonOffsetsTest__factory {
  static readonly abi = _abi;
  static createInterface(): IToucanCarbonOffsetsTestInterface {
    return new utils.Interface(_abi) as IToucanCarbonOffsetsTestInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IToucanCarbonOffsetsTest {
    return new Contract(address, _abi, signerOrProvider) as IToucanCarbonOffsetsTest;
  }
}
