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
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../common';

export type ProjectDataStruct = {
  projectId: PromiseOrValue<string>;
  standard: PromiseOrValue<string>;
  methodology: PromiseOrValue<string>;
  region: PromiseOrValue<string>;
  storageMethod: PromiseOrValue<string>;
  method: PromiseOrValue<string>;
  emissionType: PromiseOrValue<string>;
  category: PromiseOrValue<string>;
  uri: PromiseOrValue<string>;
  beneficiary: PromiseOrValue<string>;
};

export type ProjectDataStructOutput = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] & {
  projectId: string;
  standard: string;
  methodology: string;
  region: string;
  storageMethod: string;
  method: string;
  emissionType: string;
  category: string;
  uri: string;
  beneficiary: string;
};

export type VintageDataStruct = {
  name: PromiseOrValue<string>;
  startTime: PromiseOrValue<BigNumberish>;
  endTime: PromiseOrValue<BigNumberish>;
  projectTokenId: PromiseOrValue<BigNumberish>;
  totalVintageQuantity: PromiseOrValue<BigNumberish>;
  isCorsiaCompliant: PromiseOrValue<boolean>;
  isCCPcompliant: PromiseOrValue<boolean>;
  coBenefits: PromiseOrValue<string>;
  correspAdjustment: PromiseOrValue<string>;
  additionalCertification: PromiseOrValue<string>;
  uri: PromiseOrValue<string>;
  registry: PromiseOrValue<string>;
};

export type VintageDataStructOutput = [
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
  boolean,
  string,
  string,
  string,
  string,
  string
] & {
  name: string;
  startTime: BigNumber;
  endTime: BigNumber;
  projectTokenId: BigNumber;
  totalVintageQuantity: BigNumber;
  isCorsiaCompliant: boolean;
  isCCPcompliant: boolean;
  coBenefits: string;
  correspAdjustment: string;
  additionalCertification: string;
  uri: string;
  registry: string;
};

export interface ToucanCarbonOffsetsDirectRetirementsInterface extends utils.Interface {
  functions: {
    'DETOKENIZER_ROLE()': FunctionFragment;
    'RETIREMENT_ROLE()': FunctionFragment;
    'TOKENIZER_ROLE()': FunctionFragment;
    'allowance(address,address)': FunctionFragment;
    'approve(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'bridgeBurn(address,uint256)': FunctionFragment;
    'bridgeMint(address,uint256)': FunctionFragment;
    'burnFrom(address,uint256)': FunctionFragment;
    'contractRegistry()': FunctionFragment;
    'decimals()': FunctionFragment;
    'decreaseAllowance(address,uint256)': FunctionFragment;
    'getAttributes()': FunctionFragment;
    'getDepositCap()': FunctionFragment;
    'getGlobalProjectVintageIdentifiers()': FunctionFragment;
    'getRemaining()': FunctionFragment;
    'getVintageData()': FunctionFragment;
    'increaseAllowance(address,uint256)': FunctionFragment;
    'minterToId(address)': FunctionFragment;
    'name()': FunctionFragment;
    'projectVintageTokenId()': FunctionFragment;
    'retire(uint256)': FunctionFragment;
    'retireAndMintCertificate(string,address,string,string,uint256)': FunctionFragment;
    'retireFrom(address,uint256)': FunctionFragment;
    'standardRegistry()': FunctionFragment;
    'standardRegistryDecimals()': FunctionFragment;
    'symbol()': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transfer(address,uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'DETOKENIZER_ROLE'
      | 'RETIREMENT_ROLE'
      | 'TOKENIZER_ROLE'
      | 'allowance'
      | 'approve'
      | 'balanceOf'
      | 'bridgeBurn'
      | 'bridgeMint'
      | 'burnFrom'
      | 'contractRegistry'
      | 'decimals'
      | 'decreaseAllowance'
      | 'getAttributes'
      | 'getDepositCap'
      | 'getGlobalProjectVintageIdentifiers'
      | 'getRemaining'
      | 'getVintageData'
      | 'increaseAllowance'
      | 'minterToId'
      | 'name'
      | 'projectVintageTokenId'
      | 'retire'
      | 'retireAndMintCertificate'
      | 'retireFrom'
      | 'standardRegistry'
      | 'standardRegistryDecimals'
      | 'symbol'
      | 'totalSupply'
      | 'transfer'
      | 'transferFrom'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'DETOKENIZER_ROLE', values?: undefined): string;
  encodeFunctionData(functionFragment: 'RETIREMENT_ROLE', values?: undefined): string;
  encodeFunctionData(functionFragment: 'TOKENIZER_ROLE', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'allowance',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'approve',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'bridgeBurn',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'bridgeMint',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'burnFrom',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'contractRegistry', values?: undefined): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'decreaseAllowance',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getAttributes', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getDepositCap', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getGlobalProjectVintageIdentifiers',
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: 'getRemaining', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getVintageData', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'increaseAllowance',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'minterToId', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'projectVintageTokenId', values?: undefined): string;
  encodeFunctionData(functionFragment: 'retire', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: 'retireAndMintCertificate',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'retireFrom',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'standardRegistry', values?: undefined): string;
  encodeFunctionData(functionFragment: 'standardRegistryDecimals', values?: undefined): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'transfer',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferFrom',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: 'DETOKENIZER_ROLE', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'RETIREMENT_ROLE', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'TOKENIZER_ROLE', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'bridgeBurn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'bridgeMint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burnFrom', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'contractRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decreaseAllowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAttributes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDepositCap', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'getGlobalProjectVintageIdentifiers',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'getRemaining', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVintageData', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'increaseAllowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minterToId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'projectVintageTokenId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'retire', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'retireAndMintCertificate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'retireFrom', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'standardRegistry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'standardRegistryDecimals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result;

  events: {
    'Approval(address,address,uint256)': EventFragment;
    'FeeBurnt(address,uint256)': EventFragment;
    'FeePaid(address,uint256)': EventFragment;
    'Initialized(uint8)': EventFragment;
    'Retired(address,uint256,uint256)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeeBurnt'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeePaid'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Retired'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  spender: string;
  value: BigNumber;
}
export type ApprovalEvent = TypedEvent<[string, string, BigNumber], ApprovalEventObject>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface FeeBurntEventObject {
  bridger: string;
  fees: BigNumber;
}
export type FeeBurntEvent = TypedEvent<[string, BigNumber], FeeBurntEventObject>;

export type FeeBurntEventFilter = TypedEventFilter<FeeBurntEvent>;

export interface FeePaidEventObject {
  bridger: string;
  fees: BigNumber;
}
export type FeePaidEvent = TypedEvent<[string, BigNumber], FeePaidEventObject>;

export type FeePaidEventFilter = TypedEventFilter<FeePaidEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RetiredEventObject {
  sender: string;
  amount: BigNumber;
  eventId: BigNumber;
}
export type RetiredEvent = TypedEvent<[string, BigNumber, BigNumber], RetiredEventObject>;

export type RetiredEventFilter = TypedEventFilter<RetiredEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<[string, string, BigNumber], TransferEventObject>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface ToucanCarbonOffsetsDirectRetirements extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ToucanCarbonOffsetsDirectRetirementsInterface;

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
    DETOKENIZER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    RETIREMENT_ROLE(overrides?: CallOverrides): Promise<[string]>;

    TOKENIZER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    bridgeBurn(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bridgeMint(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    burnFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    contractRegistry(overrides?: CallOverrides): Promise<[string]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAttributes(
      overrides?: CallOverrides
    ): Promise<[ProjectDataStructOutput, VintageDataStructOutput]>;

    getDepositCap(overrides?: CallOverrides): Promise<[BigNumber]>;

    getGlobalProjectVintageIdentifiers(overrides?: CallOverrides): Promise<[string, string]>;

    getRemaining(overrides?: CallOverrides): Promise<[BigNumber] & { remaining: BigNumber }>;

    getVintageData(
      overrides?: CallOverrides
    ): Promise<[VintageDataStructOutput] & { vintageData: VintageDataStructOutput }>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    minterToId(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    projectVintageTokenId(overrides?: CallOverrides): Promise<[BigNumber]>;

    retire(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retireAndMintCertificate(
      retiringEntityString: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      beneficiaryString: PromiseOrValue<string>,
      retirementMessage: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retireFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    standardRegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    standardRegistryDecimals(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  DETOKENIZER_ROLE(overrides?: CallOverrides): Promise<string>;

  RETIREMENT_ROLE(overrides?: CallOverrides): Promise<string>;

  TOKENIZER_ROLE(overrides?: CallOverrides): Promise<string>;

  allowance(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  bridgeBurn(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bridgeMint(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  burnFrom(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  contractRegistry(overrides?: CallOverrides): Promise<string>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: PromiseOrValue<string>,
    subtractedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAttributes(
    overrides?: CallOverrides
  ): Promise<[ProjectDataStructOutput, VintageDataStructOutput]>;

  getDepositCap(overrides?: CallOverrides): Promise<BigNumber>;

  getGlobalProjectVintageIdentifiers(overrides?: CallOverrides): Promise<[string, string]>;

  getRemaining(overrides?: CallOverrides): Promise<BigNumber>;

  getVintageData(overrides?: CallOverrides): Promise<VintageDataStructOutput>;

  increaseAllowance(
    spender: PromiseOrValue<string>,
    addedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  minterToId(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  name(overrides?: CallOverrides): Promise<string>;

  projectVintageTokenId(overrides?: CallOverrides): Promise<BigNumber>;

  retire(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retireAndMintCertificate(
    retiringEntityString: PromiseOrValue<string>,
    beneficiary: PromiseOrValue<string>,
    beneficiaryString: PromiseOrValue<string>,
    retirementMessage: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retireFrom(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  standardRegistry(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  standardRegistryDecimals(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DETOKENIZER_ROLE(overrides?: CallOverrides): Promise<string>;

    RETIREMENT_ROLE(overrides?: CallOverrides): Promise<string>;

    TOKENIZER_ROLE(overrides?: CallOverrides): Promise<string>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    bridgeBurn(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    bridgeMint(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    burnFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    contractRegistry(overrides?: CallOverrides): Promise<string>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getAttributes(
      overrides?: CallOverrides
    ): Promise<[ProjectDataStructOutput, VintageDataStructOutput]>;

    getDepositCap(overrides?: CallOverrides): Promise<BigNumber>;

    getGlobalProjectVintageIdentifiers(overrides?: CallOverrides): Promise<[string, string]>;

    getRemaining(overrides?: CallOverrides): Promise<BigNumber>;

    getVintageData(overrides?: CallOverrides): Promise<VintageDataStructOutput>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minterToId(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    projectVintageTokenId(overrides?: CallOverrides): Promise<BigNumber>;

    retire(amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    retireAndMintCertificate(
      retiringEntityString: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      beneficiaryString: PromiseOrValue<string>,
      retirementMessage: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    retireFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    standardRegistry(overrides?: CallOverrides): Promise<string>;

    standardRegistryDecimals(overrides?: CallOverrides): Promise<number>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    'Approval(address,address,uint256)'(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;

    'FeeBurnt(address,uint256)'(bridger?: null, fees?: null): FeeBurntEventFilter;
    FeeBurnt(bridger?: null, fees?: null): FeeBurntEventFilter;

    'FeePaid(address,uint256)'(bridger?: null, fees?: null): FeePaidEventFilter;
    FeePaid(bridger?: null, fees?: null): FeePaidEventFilter;

    'Initialized(uint8)'(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    'Retired(address,uint256,uint256)'(
      sender?: null,
      amount?: null,
      eventId?: null
    ): RetiredEventFilter;
    Retired(sender?: null, amount?: null, eventId?: null): RetiredEventFilter;

    'Transfer(address,address,uint256)'(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    DETOKENIZER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    RETIREMENT_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    TOKENIZER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    bridgeBurn(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bridgeMint(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    burnFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    contractRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAttributes(overrides?: CallOverrides): Promise<BigNumber>;

    getDepositCap(overrides?: CallOverrides): Promise<BigNumber>;

    getGlobalProjectVintageIdentifiers(overrides?: CallOverrides): Promise<BigNumber>;

    getRemaining(overrides?: CallOverrides): Promise<BigNumber>;

    getVintageData(overrides?: CallOverrides): Promise<BigNumber>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    minterToId(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    projectVintageTokenId(overrides?: CallOverrides): Promise<BigNumber>;

    retire(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    retireAndMintCertificate(
      retiringEntityString: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      beneficiaryString: PromiseOrValue<string>,
      retirementMessage: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    retireFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    standardRegistry(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    standardRegistryDecimals(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DETOKENIZER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    RETIREMENT_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TOKENIZER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bridgeBurn(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bridgeMint(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    burnFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    contractRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAttributes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDepositCap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGlobalProjectVintageIdentifiers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRemaining(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVintageData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    minterToId(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    projectVintageTokenId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    retire(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    retireAndMintCertificate(
      retiringEntityString: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      beneficiaryString: PromiseOrValue<string>,
      retirementMessage: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    retireFrom(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    standardRegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    standardRegistryDecimals(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
