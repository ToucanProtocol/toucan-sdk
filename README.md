# Toucan SDK

[![NPM Package](https://img.shields.io/npm/v/toucan-sdk.svg)](https://www.npmjs.com/package/toucan-sdk)

A Typescript SDK for [Toucan Protocol](https://toucan.earth/). Wraps around [Ethers.js](https://docs.ethers.io/v5/). Works in the web browser and Node.js.

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

const toucan = new ToucanClient("polygon", provider, signer);
```

## Fetch pool prices from SushiSwap

Something that may come in handy in your applications is fetching the USD price of our pool tokens.

```typescript
nctPrice = await toucan.fetchTokenPriceOnSushiSwap("NCT");
```

The object returned by the above method will look like so:

```json
{
  "price": 0.429078376646587,
  "url": "https://app.sushi.com/analytics/tokens/0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
  "liquidityUSD": 228402845.61580917,
  "volumeUSD": 44457843860.01181
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

toucan.instantiateTCO2(tco2s[len - 1].address);

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

Why do you see my name twice you ask? 🤔

Well, the first "Alex" represents the entity that is doing the retirement/offset. The second one represents the party that 'benefits' from it. The address also represents the beneficiary.

That's useful in case you happen to be an entity that retires on behalf of someone else.

# Subgraph queries

Now, the above example of selective retirement is only useful in specific cases.

**What if you only have the name or symbol of the project?**

That's where subgraph queries come in handy. (and we have plenty of those 😉)

## Fetching a TCO2 by its symbol

```typescript
const tco2 = await toucan.fetchTCO2TokenByFullSymbol("TCO2-VCS-1718-2013");
```

The result will look like so:

```json
{
  "id": "0x0044c5a5a6f626b673224a3c0d71e851ad3d5153",
  "name": "Toucan Protocol: TCO2-VCS-1718-2013",
  "symbol": "TCO2-VCS-1718-2013",
  "address": "0x0044c5a5a6f626b673224a3c0d71e851ad3d5153",
  "projectVintage": {
    "name": "2013",
    "project": {
      "projectId": "VCS-1718"
    }
  }
}
```

Now you have quite some info on the project, including its address.

## Fetching a TCO2's data by its address

What if you already had a TCO2s address, but you now want to get more data about it?

There's a pre-built subgraph query for that too.

```typescript
const tco2 = await toucan.fetchTCO2TokenById(
  "0x0044c5a5a6f626b673224a3c0d71e851ad3d5153"
);
```

The result will look like the same as the one of the query above.

## Fetching a pool's contents

It may come in handy to know what TCO2s are in the NCT pool.

```typescript
const tco2s = await toucan.fetchPoolContents("NCT");
```

This is how the result would look (with a lot more projects in it though):

```json
[
  {
    "token": {
      "name": "Toucan Protocol: TCO2-VCS-1718-2013",
      "projectVintage": {
        "id": "296",
        "project": {
          "methodology": "VM0010",
          "standard": "VCS"
        }
      }
    },
    "amount": "37152880725394938464551"
  },
  {
    "token": {
      "name": "Toucan Protocol: TCO2-VCS-1577-2015",
      "projectVintage": {
        "id": "25",
        "project": {
          "methodology": "VM0010",
          "standard": "VCS"
        }
      }
    },
    "amount": "10000000000000000000000"
  }
]
```

## Custom queries

There's a lot more other pre-built subgraph queries that I could show you, but what I really want to show you is the `fetchCustomQuery` method.

This allows you to fetch with your own queries and can be very powerful if you know graphQL.

```typescript
import { gql } from "@urql/core";

const query = gql`
  query ($id: String) {
    project(id: $id) {
      projectId
      region
      standard
      methodology
      vintages {
        id
      }
    }
  }
`;

const result = await toucan.fetchCustomQuery(query, { id: "1" });
```

# What if I can't find contract interactions that I need?

You can always access any method or property of the bct, nct and tco2 contracts like so:

```typescript
const remainingTCO2 = await toucan.bct.tokenBalances(tco2Address);
```

This is useful if you need to interact with a method of our contracts that hasn't been implemented in the SDK yet.

# Tutorials

If you're not familiar with web3 you may want to take look at the following tutorials.

TODO
