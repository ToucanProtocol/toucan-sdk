/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  ToucanCarbonOffsetsStorage,
  ToucanCarbonOffsetsStorageInterface,
} from '../../contracts/ToucanCarbonOffsetsStorage';

const _abi = [
  {
    inputs: [],
    name: 'contractRegistry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'minterToId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export class ToucanCarbonOffsetsStorage__factory {
  static readonly abi = _abi;
  static createInterface(): ToucanCarbonOffsetsStorageInterface {
    return new utils.Interface(_abi) as ToucanCarbonOffsetsStorageInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ToucanCarbonOffsetsStorage {
    return new Contract(address, _abi, signerOrProvider) as ToucanCarbonOffsetsStorage;
  }
}
