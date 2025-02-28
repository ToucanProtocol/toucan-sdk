/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export type FractionRequestDataStruct = {
  amount: PromiseOrValue<BigNumberish>;
  projectVintageTokenId: PromiseOrValue<BigNumberish>;
  beneficiary: PromiseOrValue<string>;
  beneficiaryString: PromiseOrValue<string>;
  retirementMessage: PromiseOrValue<string>;
  beneficiaryLocation: PromiseOrValue<string>;
  consumptionCountryCode: PromiseOrValue<string>;
  consumptionPeriodStart: PromiseOrValue<BigNumberish>;
  consumptionPeriodEnd: PromiseOrValue<BigNumberish>;
  tokenURI: PromiseOrValue<string>;
  extraData: PromiseOrValue<BytesLike>;
};

export type FractionRequestDataStructOutput = [
  BigNumber,
  BigNumber,
  string,
  string,
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  string,
  string
] & {
  amount: BigNumber;
  projectVintageTokenId: BigNumber;
  beneficiary: string;
  beneficiaryString: string;
  retirementMessage: string;
  beneficiaryLocation: string;
  consumptionCountryCode: string;
  consumptionPeriodStart: BigNumber;
  consumptionPeriodEnd: BigNumber;
  tokenURI: string;
  extraData: string;
};

export interface IRetirementCertificateFractionalizerInterface extends utils.Interface {
  functions: {
    'mintFraction((uint256,uint256,address,string,string,string,string,uint256,uint256,string,bytes))': FunctionFragment;
    'mintFractionFrom(address,(uint256,uint256,address,string,string,string,string,uint256,uint256,string,bytes))': FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: 'mintFraction' | 'mintFractionFrom'): FunctionFragment;

  encodeFunctionData(functionFragment: 'mintFraction', values: [FractionRequestDataStruct]): string;
  encodeFunctionData(
    functionFragment: 'mintFractionFrom',
    values: [PromiseOrValue<string>, FractionRequestDataStruct]
  ): string;

  decodeFunctionResult(functionFragment: 'mintFraction', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintFractionFrom', data: BytesLike): Result;

  events: {};
}

export interface IRetirementCertificateFractionalizer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRetirementCertificateFractionalizerInterface;

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
    mintFraction(
      params: FractionRequestDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintFractionFrom(
      from: PromiseOrValue<string>,
      params: FractionRequestDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  mintFraction(
    params: FractionRequestDataStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintFractionFrom(
    from: PromiseOrValue<string>,
    params: FractionRequestDataStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    mintFraction(params: FractionRequestDataStruct, overrides?: CallOverrides): Promise<BigNumber>;

    mintFractionFrom(
      from: PromiseOrValue<string>,
      params: FractionRequestDataStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    mintFraction(
      params: FractionRequestDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintFractionFrom(
      from: PromiseOrValue<string>,
      params: FractionRequestDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    mintFraction(
      params: FractionRequestDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintFractionFrom(
      from: PromiseOrValue<string>,
      params: FractionRequestDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
