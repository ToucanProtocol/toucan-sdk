/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  ICarbonProjectVintages,
  ICarbonProjectVintagesInterface,
} from '../../../contracts/interfaces/ICarbonProjectVintages';

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint64',
            name: 'startTime',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'endTime',
            type: 'uint64',
          },
          {
            internalType: 'uint256',
            name: 'projectTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'totalVintageQuantity',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'isCorsiaCompliant',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCCPcompliant',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'coBenefits',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'correspAdjustment',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'additionalCertification',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'registry',
            type: 'string',
          },
        ],
        internalType: 'struct VintageData',
        name: '_vintageData',
        type: 'tuple',
      },
    ],
    name: 'addNewVintage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
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
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'exists',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getProjectVintageDataByTokenId',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint64',
            name: 'startTime',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'endTime',
            type: 'uint64',
          },
          {
            internalType: 'uint256',
            name: 'projectTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'totalVintageQuantity',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'isCorsiaCompliant',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCCPcompliant',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'coBenefits',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'correspAdjustment',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'additionalCertification',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'registry',
            type: 'string',
          },
        ],
        internalType: 'struct VintageData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export class ICarbonProjectVintages__factory {
  static readonly abi = _abi;
  static createInterface(): ICarbonProjectVintagesInterface {
    return new utils.Interface(_abi) as ICarbonProjectVintagesInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ICarbonProjectVintages {
    return new Contract(address, _abi, signerOrProvider) as ICarbonProjectVintages;
  }
}
