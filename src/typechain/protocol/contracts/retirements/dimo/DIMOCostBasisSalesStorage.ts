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

export interface DIMOCostBasisSalesStorageInterface extends utils.Interface {
  functions: {
    'contractRegistry()': FunctionFragment;
    'dimoUserProfile()': FunctionFragment;
    'lister()': FunctionFragment;
    'listing(uint256,address)': FunctionFragment;
    'paymentToken()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'contractRegistry'
      | 'dimoUserProfile'
      | 'lister'
      | 'listing'
      | 'paymentToken'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'contractRegistry', values?: undefined): string;
  encodeFunctionData(functionFragment: 'dimoUserProfile', values?: undefined): string;
  encodeFunctionData(functionFragment: 'lister', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'listing',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'paymentToken', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'contractRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'dimoUserProfile', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lister', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'listing', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paymentToken', data: BytesLike): Result;

  events: {};
}

export interface DIMOCostBasisSalesStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DIMOCostBasisSalesStorageInterface;

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

    dimoUserProfile(overrides?: CallOverrides): Promise<[string]>;

    lister(overrides?: CallOverrides): Promise<[string]>;

    listing(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; pricePerUnit: BigNumber }>;

    paymentToken(overrides?: CallOverrides): Promise<[string]>;
  };

  contractRegistry(overrides?: CallOverrides): Promise<string>;

  dimoUserProfile(overrides?: CallOverrides): Promise<string>;

  lister(overrides?: CallOverrides): Promise<string>;

  listing(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; pricePerUnit: BigNumber }>;

  paymentToken(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    contractRegistry(overrides?: CallOverrides): Promise<string>;

    dimoUserProfile(overrides?: CallOverrides): Promise<string>;

    lister(overrides?: CallOverrides): Promise<string>;

    listing(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; pricePerUnit: BigNumber }>;

    paymentToken(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    contractRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    dimoUserProfile(overrides?: CallOverrides): Promise<BigNumber>;

    lister(overrides?: CallOverrides): Promise<BigNumber>;

    listing(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    paymentToken(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    contractRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    dimoUserProfile(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lister(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listing(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    paymentToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
