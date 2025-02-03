/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  ToucanContractRegistryStorageV1,
  ToucanContractRegistryStorageV1Interface,
} from '../../../contracts/ToucanContractRegistryStorage.sol/ToucanContractRegistryStorageV1';

const _abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'toucanCarbonOffsetFactories',
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

export class ToucanContractRegistryStorageV1__factory {
  static readonly abi = _abi;
  static createInterface(): ToucanContractRegistryStorageV1Interface {
    return new utils.Interface(_abi) as ToucanContractRegistryStorageV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ToucanContractRegistryStorageV1 {
    return new Contract(address, _abi, signerOrProvider) as ToucanContractRegistryStorageV1;
  }
}
