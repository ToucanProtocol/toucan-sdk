/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../common';

export interface ToucanCarbonOffsetsEscrowStorageV1Interface extends utils.Interface {
  functions: {
    'contractRegistry()': FunctionFragment;
    'detokenizationRequestIdCounter()': FunctionFragment;
    'retirementRequestIdCounter()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'contractRegistry'
      | 'detokenizationRequestIdCounter'
      | 'retirementRequestIdCounter'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'contractRegistry', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'detokenizationRequestIdCounter',
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: 'retirementRequestIdCounter', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'contractRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'detokenizationRequestIdCounter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'retirementRequestIdCounter', data: BytesLike): Result;

  events: {};
}

export interface ToucanCarbonOffsetsEscrowStorageV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ToucanCarbonOffsetsEscrowStorageV1Interface;

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

    detokenizationRequestIdCounter(overrides?: CallOverrides): Promise<[BigNumber]>;

    retirementRequestIdCounter(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  contractRegistry(overrides?: CallOverrides): Promise<string>;

  detokenizationRequestIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

  retirementRequestIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    contractRegistry(overrides?: CallOverrides): Promise<string>;

    detokenizationRequestIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

    retirementRequestIdCounter(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    contractRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    detokenizationRequestIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

    retirementRequestIdCounter(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    contractRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    detokenizationRequestIdCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    retirementRequestIdCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
