/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface OffsetHelperInterface extends ethers.utils.Interface {
  functions: {
    "addPath(string,address[])": FunctionFragment;
    "addPoolToken(address)": FunctionFragment;
    "autoOffsetExactInETH(address)": FunctionFragment;
    "autoOffsetExactInToken(address,address,uint256)": FunctionFragment;
    "autoOffsetExactOutETH(address,uint256)": FunctionFragment;
    "autoOffsetExactOutToken(address,address,uint256)": FunctionFragment;
    "autoOffsetPoolToken(address,uint256)": FunctionFragment;
    "autoRedeem(address,uint256)": FunctionFragment;
    "autoRetire(address[],uint256[])": FunctionFragment;
    "calculateExpectedPoolTokenForETH(address,uint256)": FunctionFragment;
    "calculateExpectedPoolTokenForToken(address,address,uint256)": FunctionFragment;
    "calculateNeededETHAmount(address,uint256)": FunctionFragment;
    "calculateNeededTokenAmount(address,address,uint256)": FunctionFragment;
    "dexRouterAddress()": FunctionFragment;
    "eligibleSwapPaths(address,uint256)": FunctionFragment;
    "eligibleSwapPathsBySymbol(string,uint256)": FunctionFragment;
    "isERC20AddressEligible(address)": FunctionFragment;
    "isPoolAddressEligible(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "paths(uint256,uint256)": FunctionFragment;
    "poolAddresses(uint256)": FunctionFragment;
    "removePath(string)": FunctionFragment;
    "removePoolToken(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "swapExactInETH(address)": FunctionFragment;
    "swapExactInToken(address,address,uint256)": FunctionFragment;
    "swapExactOutETH(address,uint256)": FunctionFragment;
    "swapExactOutToken(address,address,uint256)": FunctionFragment;
    "tokenSymbolsForPaths(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addPath",
    values: [string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addPoolToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "autoOffsetExactInETH",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "autoOffsetExactInToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "autoOffsetExactOutETH",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "autoOffsetExactOutToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "autoOffsetPoolToken",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "autoRedeem",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "autoRetire",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateExpectedPoolTokenForETH",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateExpectedPoolTokenForToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateNeededETHAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateNeededTokenAmount",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "dexRouterAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "eligibleSwapPaths",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "eligibleSwapPathsBySymbol",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isERC20AddressEligible",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isPoolAddressEligible",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "paths",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "poolAddresses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "removePath", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removePoolToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactInETH",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactInToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactOutETH",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactOutToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSymbolsForPaths",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "addPath", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addPoolToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "autoOffsetExactInETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "autoOffsetExactInToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "autoOffsetExactOutETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "autoOffsetExactOutToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "autoOffsetPoolToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "autoRedeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "autoRetire", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateExpectedPoolTokenForETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateExpectedPoolTokenForToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateNeededETHAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateNeededTokenAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dexRouterAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eligibleSwapPaths",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eligibleSwapPathsBySymbol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isERC20AddressEligible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPoolAddressEligible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paths", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removePath", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removePoolToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactInETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactInToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactOutETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactOutToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenSymbolsForPaths",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Redeemed(address,address,address[],uint256[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeemed"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type RedeemedEvent = TypedEvent<
  [string, string, string[], BigNumber[]] & {
    sender: string;
    poolToken: string;
    tco2s: string[];
    amounts: BigNumber[];
  }
>;

export class OffsetHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: OffsetHelperInterface;

  functions: {
    addPath(
      _tokenSymbol: string,
      _path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addPoolToken(
      _poolToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoOffsetExactInETH(
      _poolToken: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoOffsetExactInToken(
      _fromToken: string,
      _poolToken: string,
      _amountToSwap: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoOffsetExactOutETH(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoOffsetExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoOffsetPoolToken(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoRedeem(
      _fromToken: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    autoRetire(
      _tco2s: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calculateExpectedPoolTokenForETH(
      _poolToken: string,
      _fromTokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;

    calculateExpectedPoolTokenForToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;

    calculateNeededETHAmount(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountIn: BigNumber }>;

    calculateNeededTokenAmount(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountIn: BigNumber }>;

    dexRouterAddress(overrides?: CallOverrides): Promise<[string]>;

    eligibleSwapPaths(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    eligibleSwapPathsBySymbol(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isERC20AddressEligible(
      _erc20Address: string,
      overrides?: CallOverrides
    ): Promise<[string[]] & { _path: string[] }>;

    isPoolAddressEligible(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<[boolean] & { _isEligible: boolean }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paths(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    poolAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    removePath(
      _tokenSymbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removePoolToken(
      _poolToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactInETH(
      _poolToken: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactInToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactOutETH(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenSymbolsForPaths(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addPath(
    _tokenSymbol: string,
    _path: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addPoolToken(
    _poolToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoOffsetExactInETH(
    _poolToken: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoOffsetExactInToken(
    _fromToken: string,
    _poolToken: string,
    _amountToSwap: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoOffsetExactOutETH(
    _poolToken: string,
    _amountToOffset: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoOffsetExactOutToken(
    _fromToken: string,
    _poolToken: string,
    _amountToOffset: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoOffsetPoolToken(
    _poolToken: string,
    _amountToOffset: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoRedeem(
    _fromToken: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  autoRetire(
    _tco2s: string[],
    _amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calculateExpectedPoolTokenForETH(
    _poolToken: string,
    _fromTokenAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateExpectedPoolTokenForToken(
    _fromToken: string,
    _poolToken: string,
    _fromAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateNeededETHAmount(
    _poolToken: string,
    _toAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateNeededTokenAmount(
    _fromToken: string,
    _poolToken: string,
    _toAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  dexRouterAddress(overrides?: CallOverrides): Promise<string>;

  eligibleSwapPaths(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  eligibleSwapPathsBySymbol(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  isERC20AddressEligible(
    _erc20Address: string,
    overrides?: CallOverrides
  ): Promise<string[]>;

  isPoolAddressEligible(
    _poolToken: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  paths(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  poolAddresses(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  removePath(
    _tokenSymbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removePoolToken(
    _poolToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactInETH(
    _poolToken: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactInToken(
    _fromToken: string,
    _poolToken: string,
    _fromAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactOutETH(
    _poolToken: string,
    _toAmount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactOutToken(
    _fromToken: string,
    _poolToken: string,
    _toAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenSymbolsForPaths(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPath(
      _tokenSymbol: string,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    addPoolToken(_poolToken: string, overrides?: CallOverrides): Promise<void>;

    autoOffsetExactInETH(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & { tco2s: string[]; amounts: BigNumber[] }
    >;

    autoOffsetExactInToken(
      _fromToken: string,
      _poolToken: string,
      _amountToSwap: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & { tco2s: string[]; amounts: BigNumber[] }
    >;

    autoOffsetExactOutETH(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & { tco2s: string[]; amounts: BigNumber[] }
    >;

    autoOffsetExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & { tco2s: string[]; amounts: BigNumber[] }
    >;

    autoOffsetPoolToken(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & { tco2s: string[]; amounts: BigNumber[] }
    >;

    autoRedeem(
      _fromToken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & { tco2s: string[]; amounts: BigNumber[] }
    >;

    autoRetire(
      _tco2s: string[],
      _amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    calculateExpectedPoolTokenForETH(
      _poolToken: string,
      _fromTokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateExpectedPoolTokenForToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateNeededETHAmount(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateNeededTokenAmount(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    dexRouterAddress(overrides?: CallOverrides): Promise<string>;

    eligibleSwapPaths(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    eligibleSwapPathsBySymbol(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    isERC20AddressEligible(
      _erc20Address: string,
      overrides?: CallOverrides
    ): Promise<string[]>;

    isPoolAddressEligible(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    paths(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    poolAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    removePath(_tokenSymbol: string, overrides?: CallOverrides): Promise<void>;

    removePoolToken(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    swapExactInETH(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapExactInToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapExactOutETH(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swapExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenSymbolsForPaths(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "Redeemed(address,address,address[],uint256[])"(
      sender?: null,
      poolToken?: null,
      tco2s?: null,
      amounts?: null
    ): TypedEventFilter<
      [string, string, string[], BigNumber[]],
      {
        sender: string;
        poolToken: string;
        tco2s: string[];
        amounts: BigNumber[];
      }
    >;

    Redeemed(
      sender?: null,
      poolToken?: null,
      tco2s?: null,
      amounts?: null
    ): TypedEventFilter<
      [string, string, string[], BigNumber[]],
      {
        sender: string;
        poolToken: string;
        tco2s: string[];
        amounts: BigNumber[];
      }
    >;
  };

  estimateGas: {
    addPath(
      _tokenSymbol: string,
      _path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addPoolToken(
      _poolToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoOffsetExactInETH(
      _poolToken: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoOffsetExactInToken(
      _fromToken: string,
      _poolToken: string,
      _amountToSwap: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoOffsetExactOutETH(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoOffsetExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoOffsetPoolToken(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoRedeem(
      _fromToken: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    autoRetire(
      _tco2s: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calculateExpectedPoolTokenForETH(
      _poolToken: string,
      _fromTokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateExpectedPoolTokenForToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateNeededETHAmount(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateNeededTokenAmount(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    dexRouterAddress(overrides?: CallOverrides): Promise<BigNumber>;

    eligibleSwapPaths(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    eligibleSwapPathsBySymbol(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isERC20AddressEligible(
      _erc20Address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPoolAddressEligible(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paths(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removePath(
      _tokenSymbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removePoolToken(
      _poolToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactInETH(
      _poolToken: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactInToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactOutETH(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenSymbolsForPaths(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPath(
      _tokenSymbol: string,
      _path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addPoolToken(
      _poolToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoOffsetExactInETH(
      _poolToken: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoOffsetExactInToken(
      _fromToken: string,
      _poolToken: string,
      _amountToSwap: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoOffsetExactOutETH(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoOffsetExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoOffsetPoolToken(
      _poolToken: string,
      _amountToOffset: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoRedeem(
      _fromToken: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    autoRetire(
      _tco2s: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calculateExpectedPoolTokenForETH(
      _poolToken: string,
      _fromTokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateExpectedPoolTokenForToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateNeededETHAmount(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateNeededTokenAmount(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    dexRouterAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eligibleSwapPaths(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eligibleSwapPathsBySymbol(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isERC20AddressEligible(
      _erc20Address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPoolAddressEligible(
      _poolToken: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paths(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removePath(
      _tokenSymbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removePoolToken(
      _poolToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactInETH(
      _poolToken: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactInToken(
      _fromToken: string,
      _poolToken: string,
      _fromAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactOutETH(
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactOutToken(
      _fromToken: string,
      _poolToken: string,
      _toAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenSymbolsForPaths(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
