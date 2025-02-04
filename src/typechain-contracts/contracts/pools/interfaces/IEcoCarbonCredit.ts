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

export interface IEcoCarbonCreditInterface extends utils.Interface {
  functions: {
    'projectId()': FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: 'projectId'): FunctionFragment;

  encodeFunctionData(functionFragment: 'projectId', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'projectId', data: BytesLike): Result;

  events: {};
}

export interface IEcoCarbonCredit extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IEcoCarbonCreditInterface;

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
    projectId(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  projectId(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    projectId(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    projectId(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    projectId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
