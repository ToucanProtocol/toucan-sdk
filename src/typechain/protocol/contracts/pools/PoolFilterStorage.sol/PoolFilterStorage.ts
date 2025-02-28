/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../../common';

export interface PoolFilterStorageInterface extends utils.Interface {
  functions: {
    'contractRegistry()': FunctionFragment;
    'externalAllowlist(address)': FunctionFragment;
    'externalERC1155Allowlist(address,uint256)': FunctionFragment;
    'internalAllowlist(address)': FunctionFragment;
    'internalBlocklist(address)': FunctionFragment;
    'methodologies(string)': FunctionFragment;
    'methodologiesIsAcceptedMapping()': FunctionFragment;
    'minimumVintageStartTime()': FunctionFragment;
    'regions(string)': FunctionFragment;
    'regionsIsAcceptedMapping()': FunctionFragment;
    'standards(string)': FunctionFragment;
    'standardsIsAcceptedMapping()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'contractRegistry'
      | 'externalAllowlist'
      | 'externalERC1155Allowlist'
      | 'internalAllowlist'
      | 'internalBlocklist'
      | 'methodologies'
      | 'methodologiesIsAcceptedMapping'
      | 'minimumVintageStartTime'
      | 'regions'
      | 'regionsIsAcceptedMapping'
      | 'standards'
      | 'standardsIsAcceptedMapping'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'contractRegistry', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'externalAllowlist',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'externalERC1155Allowlist',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'internalAllowlist',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'internalBlocklist',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'methodologies', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'methodologiesIsAcceptedMapping',
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: 'minimumVintageStartTime', values?: undefined): string;
  encodeFunctionData(functionFragment: 'regions', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'regionsIsAcceptedMapping', values?: undefined): string;
  encodeFunctionData(functionFragment: 'standards', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'standardsIsAcceptedMapping', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'contractRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'externalAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'externalERC1155Allowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'internalAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'internalBlocklist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'methodologies', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'methodologiesIsAcceptedMapping', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minimumVintageStartTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'regions', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'regionsIsAcceptedMapping', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'standards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'standardsIsAcceptedMapping', data: BytesLike): Result;

  events: {};
}

export interface PoolFilterStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PoolFilterStorageInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    contractRegistry(overrides?: CallOverrides): Promise<[string]>;

    externalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    externalERC1155Allowlist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    internalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    internalBlocklist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    methodologies(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    methodologiesIsAcceptedMapping(overrides?: CallOverrides): Promise<[boolean]>;

    minimumVintageStartTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    regions(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    regionsIsAcceptedMapping(overrides?: CallOverrides): Promise<[boolean]>;

    standards(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    standardsIsAcceptedMapping(overrides?: CallOverrides): Promise<[boolean]>;
  };

  contractRegistry(overrides?: CallOverrides): Promise<string>;

  externalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  externalERC1155Allowlist(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  internalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  internalBlocklist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  methodologies(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  methodologiesIsAcceptedMapping(overrides?: CallOverrides): Promise<boolean>;

  minimumVintageStartTime(overrides?: CallOverrides): Promise<BigNumber>;

  regions(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  regionsIsAcceptedMapping(overrides?: CallOverrides): Promise<boolean>;

  standards(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  standardsIsAcceptedMapping(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    contractRegistry(overrides?: CallOverrides): Promise<string>;

    externalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    externalERC1155Allowlist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    internalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    internalBlocklist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    methodologies(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    methodologiesIsAcceptedMapping(overrides?: CallOverrides): Promise<boolean>;

    minimumVintageStartTime(overrides?: CallOverrides): Promise<BigNumber>;

    regions(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    regionsIsAcceptedMapping(overrides?: CallOverrides): Promise<boolean>;

    standards(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    standardsIsAcceptedMapping(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    contractRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    externalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    externalERC1155Allowlist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    internalAllowlist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    internalBlocklist(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    methodologies(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    methodologiesIsAcceptedMapping(overrides?: CallOverrides): Promise<BigNumber>;

    minimumVintageStartTime(overrides?: CallOverrides): Promise<BigNumber>;

    regions(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    regionsIsAcceptedMapping(overrides?: CallOverrides): Promise<BigNumber>;

    standards(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    standardsIsAcceptedMapping(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    contractRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    externalAllowlist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    externalERC1155Allowlist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    internalAllowlist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    internalBlocklist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    methodologies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    methodologiesIsAcceptedMapping(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minimumVintageStartTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    regions(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    regionsIsAcceptedMapping(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    standards(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    standardsIsAcceptedMapping(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
