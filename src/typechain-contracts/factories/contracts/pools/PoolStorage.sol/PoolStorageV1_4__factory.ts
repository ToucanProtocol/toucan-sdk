/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  PoolStorageV1_4,
  PoolStorageV1_4Interface,
} from '../../../../contracts/pools/PoolStorage.sol/PoolStorageV1_4';

const _abi = [
  {
    inputs: [],
    name: 'filter',
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

export class PoolStorageV1_4__factory {
  static readonly abi = _abi;
  static createInterface(): PoolStorageV1_4Interface {
    return new utils.Interface(_abi) as PoolStorageV1_4Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): PoolStorageV1_4 {
    return new Contract(address, _abi, signerOrProvider) as PoolStorageV1_4;
  }
}
