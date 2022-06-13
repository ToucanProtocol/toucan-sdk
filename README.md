# Toucan SDK

A JavaScript SDK for [Toucan Protocol](https://toucan.earth/). Wraps around [Ethers.js](https://docs.ethers.io/v5/). Works in the web browser and Node.js.

_Full documentation coming soon._

⚠️ This SDK is heavily under development. USE AT YOUR OWN RISK.

## Install

```
npm i toucan-sdk
```

or

```
yarn add toucan-sdk
```

# Quickstart

Instantiate the Toucan client to interact with our infrastructure.

```typescript
import ToucanClient from "toucan-sdk";

const toucan = new ToucanClient("polygon", signer.address, provider, signer);
```

## Fetch pool prices from SushiSwap

Something that may come in handy in your applications is fetching the USD price of our pool tokens.

```typescript
nctPrice = await toucan.fetchTokenPriceOnSushiSwap("NCT");
```

The object returned by the above method will look like so:

```typescript
{
  price: 0.429078376646587,
  url: 'https://app.sushi.com/analytics/tokens/0x2F800Db0fdb5223b3C3f354886d907A671414A7F',
  liquidityUSD: 228402845.61580917,
  volumeUSD: 44457843860.01181
}
```

# AutoOffset CO2

Using the OffsetHelper methods is the easiest way to offset CO2 right now as it handles the whole process for you.

_(Uses SushiSwap to acquire BCT/NCT, redeems it for TCO2s and retires them)_

This is how you do that when you want to use ETH (or the network's native currency) in your balance.

In this example, you'd be offseting 1 TON of CO2 with carbon projects from the NCT pool.

```typescript
const offsetReceipt = await toucan.autoOffsetUsingETH("NCT", parseEther("1.0"));
```

## Don't want to spend your ETH to offset?

You can use different tokens to do it. Currently it works with USDC, WMATIC and WETH only.

```typescript
const weth = new ethers.Contract(wethAddress, wethAbi, signer);

const offsetReceipt = await toucan.autoOffsetUsingSwapToken(
  "NCT",
  parseEther("1.0"),
  weth
);
```

## Offset with your own BCT/NCT

If you already have BCT/NCT, you can use `autoOffsetUsingPoolToken()` like so:

```typescript
const weth = new ethers.Contract(wethAddress, wethAbi, signer);

const offsetReceipt = await toucan.autoOffsetUsingPoolToken(
  "NCT",
  parseEther("1.0")
);
```

## Selectively Offset CO2

You may want to selectively offset certain carbon projects. You can do that too.

Assuming you already have some NCT, this example gets an array of all TCO2s in the NCT pool ascending by rank/quality.

Then redeems and retires 3 TONS of the higest ranked TCO2 it can find.

```typescript
const scoredTCO2s = await toucan.getScoredTCO2s("NCT");
const len = scoredTCO2s.length;

const redeemReceipt = await toucan.redeemMany(
  "NCT",
  [scoredTCO2s[len - 1]],
  [parseEther("3.0")]
);

toucan.instantiateTCO2(tco2s[0].address);

const retirementReceipt = await toucan.retire(parseEther("3.0"));
```

Of course, you could have avoided using the `getScoredTCO2s` method if you already had the address of the TCO2s you wanted to offset.

## But I want the Retirement NFT

If you do, that's also quite easy to pull off. You just replace the usage of the `retire()` method in the example above with this:

```typescript
const retirementReceipt = await toucan.retireAndMintCertificate(
  "Alex",
  signer.address,
  "Alex",
  "Just helping the planet",
  parseEther("3.0")
);
```

Why can you see my name twice you ask? 🤔

Well, the first "Alex" represents the entity that is doing the retirement/offset. The second one represents the party that 'benefits' from it. The address also represents the beneficiary.

That's useful in case you happen to be a 'broker' that retires in someone else's name.

# Subgraph queries

TODO

## Custom queries

TODO

# Tutorials

If you're not familiar with web3 you may want to take look at the following tutorials.

TODO
