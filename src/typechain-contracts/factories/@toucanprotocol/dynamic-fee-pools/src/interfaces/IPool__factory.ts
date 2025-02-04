/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  IPool,
  IPoolInterface,
} from '../../../../../@toucanprotocol/dynamic-fee-pools/src/interfaces/IPool';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'erc1155',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'totalPerProjectSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tco2',
        type: 'address',
      },
    ],
    name: 'totalPerProjectSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalTCO2Supply',
    outputs: [
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export class IPool__factory {
  static readonly abi = _abi;
  static createInterface(): IPoolInterface {
    return new utils.Interface(_abi) as IPoolInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IPool {
    return new Contract(address, _abi, signerOrProvider) as IPool;
  }
}
