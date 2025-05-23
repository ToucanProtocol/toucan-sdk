/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  ToucanCarbonOffsetsFactoryStorage,
  ToucanCarbonOffsetsFactoryStorageInterface,
} from '../../../contracts/ToucanCarbonOffsetsFactoryStorage.sol/ToucanCarbonOffsetsFactoryStorage';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowedBridges',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'beacon',
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
    inputs: [],
    name: 'bridgeFeeBurnAddress',
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
    inputs: [],
    name: 'bridgeFeeBurnPercentageInBase',
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
  {
    inputs: [],
    name: 'bridgeFeePercentageInBase',
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
  {
    inputs: [],
    name: 'bridgeFeeReceiver',
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
] as const;

export class ToucanCarbonOffsetsFactoryStorage__factory {
  static readonly abi = _abi;
  static createInterface(): ToucanCarbonOffsetsFactoryStorageInterface {
    return new utils.Interface(_abi) as ToucanCarbonOffsetsFactoryStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ToucanCarbonOffsetsFactoryStorage {
    return new Contract(address, _abi, signerOrProvider) as ToucanCarbonOffsetsFactoryStorage;
  }
}
