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
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../../../common';

export interface DIMOUserProfileStorageInterface extends utils.Interface {
  functions: {
    'baseURI()': FunctionFragment;
    'dimoCostBasisSales()': FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: 'baseURI' | 'dimoCostBasisSales'): FunctionFragment;

  encodeFunctionData(functionFragment: 'baseURI', values?: undefined): string;
  encodeFunctionData(functionFragment: 'dimoCostBasisSales', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'baseURI', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'dimoCostBasisSales', data: BytesLike): Result;

  events: {};
}

export interface DIMOUserProfileStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DIMOUserProfileStorageInterface;

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
    baseURI(overrides?: CallOverrides): Promise<[string]>;

    dimoCostBasisSales(overrides?: CallOverrides): Promise<[string]>;
  };

  baseURI(overrides?: CallOverrides): Promise<string>;

  dimoCostBasisSales(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    baseURI(overrides?: CallOverrides): Promise<string>;

    dimoCostBasisSales(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    baseURI(overrides?: CallOverrides): Promise<BigNumber>;

    dimoCostBasisSales(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    baseURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    dimoCostBasisSales(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
