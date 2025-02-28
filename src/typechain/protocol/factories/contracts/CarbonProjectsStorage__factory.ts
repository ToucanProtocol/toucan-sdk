/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  CarbonProjectsStorage,
  CarbonProjectsStorageInterface,
} from '../../contracts/CarbonProjectsStorage';

const _abi = [
  {
    inputs: [],
    name: 'baseURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
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
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'pidToTokenId',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'projectData',
    outputs: [
      {
        internalType: 'string',
        name: 'projectId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'standard',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'methodology',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'region',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'storageMethod',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'method',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'emissionType',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'projectIds',
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
    name: 'projectTokenCounter',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'validProjectTokenIds',
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
] as const;

export class CarbonProjectsStorage__factory {
  static readonly abi = _abi;
  static createInterface(): CarbonProjectsStorageInterface {
    return new utils.Interface(_abi) as CarbonProjectsStorageInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): CarbonProjectsStorage {
    return new Contract(address, _abi, signerOrProvider) as CarbonProjectsStorage;
  }
}
