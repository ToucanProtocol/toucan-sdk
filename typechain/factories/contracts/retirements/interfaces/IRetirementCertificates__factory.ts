/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type {
  IRetirementCertificates,
  IRetirementCertificatesInterface,
} from '../../../../contracts/retirements/interfaces/IRetirementCertificates';

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'certificates',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'retirementEventIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'retiringEntity',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'retiringEntityString',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'beneficiaryString',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'retirementMessage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'beneficiaryLocation',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'consumptionCountryCode',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'consumptionPeriodStart',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'consumptionPeriodEnd',
            type: 'uint256',
          },
        ],
        internalType: 'struct CertificateData',
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
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'retirementEventIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'retiringEntity',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'retiringEntityString',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'beneficiaryString',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'retirementMessage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'beneficiaryLocation',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'consumptionCountryCode',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'consumptionPeriodStart',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'consumptionPeriodEnd',
            type: 'uint256',
          },
        ],
        internalType: 'struct CertificateData',
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
        name: 'retiringEntity',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'retiringEntityString',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'beneficiaryString',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'retirementMessage',
        type: 'string',
      },
      {
        internalType: 'uint256[]',
        name: 'retirementEventIds',
        type: 'uint256[]',
      },
    ],
    name: 'mintCertificate',
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
        name: 'retiringEntity',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'retiringEntityString',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'beneficiaryString',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'retirementMessage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'beneficiaryLocation',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'consumptionCountryCode',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'consumptionPeriodStart',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'consumptionPeriodEnd',
            type: 'uint256',
          },
        ],
        internalType: 'struct CreateRetirementRequestParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'uint256[]',
        name: 'retirementEventIds',
        type: 'uint256[]',
      },
    ],
    name: 'mintCertificateWithExtraData',
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
        name: 'retiringEntity',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectVintageTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isLegacy',
        type: 'bool',
      },
    ],
    name: 'registerEvent',
    outputs: [
      {
        internalType: 'uint256',
        name: 'retireEventCounter',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
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
    name: 'retirements',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'retiringEntity',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'projectVintageTokenId',
            type: 'uint256',
          },
        ],
        internalType: 'struct RetirementEvent',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export class IRetirementCertificates__factory {
  static readonly abi = _abi;
  static createInterface(): IRetirementCertificatesInterface {
    return new utils.Interface(_abi) as IRetirementCertificatesInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IRetirementCertificates {
    return new Contract(address, _abi, signerOrProvider) as IRetirementCertificates;
  }
}
