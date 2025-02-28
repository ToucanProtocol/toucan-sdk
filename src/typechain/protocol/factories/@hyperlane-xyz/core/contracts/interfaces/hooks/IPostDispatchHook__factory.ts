/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  IPostDispatchHook,
  IPostDispatchHookInterface,
} from '../../../../../../@hyperlane-xyz/core/contracts/interfaces/hooks/IPostDispatchHook';

const _abi = [
  {
    inputs: [],
    name: 'hookType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'metadata',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'postDispatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'metadata',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'quoteDispatch',
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
        internalType: 'bytes',
        name: 'metadata',
        type: 'bytes',
      },
    ],
    name: 'supportsMetadata',
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

export class IPostDispatchHook__factory {
  static readonly abi = _abi;
  static createInterface(): IPostDispatchHookInterface {
    return new utils.Interface(_abi) as IPostDispatchHookInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IPostDispatchHook {
    return new Contract(address, _abi, signerOrProvider) as IPostDispatchHook;
  }
}
