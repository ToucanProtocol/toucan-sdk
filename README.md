# Toucan SDK

[![NPM Package](https://img.shields.io/npm/v/toucan-sdk.svg)](https://www.npmjs.com/package/toucan-sdk)

A Typescript SDK for [Toucan Protocol](https://toucan.earth/). Wraps around [Ethers.js](https://docs.ethers.io/v5/). Works in the web browser and Node.js.

_Full documentation coming soon._

⚠️ This SDK is heavily under development. USE AT YOUR OWN RISK. ⚠️

## Install

```
npm i toucan-sdk
```

or

```
yarn add toucan-sdk
```

# Quickstart

Instantiate the ToucanClient and set a signer & provider to interact with our infrastructure.

```typescript
import ToucanClient from "toucan-sdk";

const toucan = new ToucanClient("alfajores", provider, signer);
```

You could also set the signer/provider later if you prefer that. They are optional. But you will need to set them if you want to interact with contracts. The provider is read-only, while the signer allows both writing to and reading from the blockchain.

```typescript
import ToucanClient from "toucan-sdk";

const toucan = new ToucanClient("alfajores");
toucan.setProvider(provider);
toucan.setSigner(signer);
```

If you don't have a signer nor a provider set, you can only interact with the subgraph.

## Fetch pool prices from a Dex

You can find pools for Toucan pool tokens on [Celo Network](https://celo.org) at [Ubeswap](https://ubeswap.org) and for [Polygon Network](https://polygon.technology) on [SushiSwap](sushi.com)

Something that may come in handy in your applications is fetching the USD price of our pool tokens.

```typescript
nctPrice = await toucan.fetchTokenPriceOnDex("NCT");
```

The object returned by the above method will look like so:

```json
{
  "price": 0.6729727912290213,
  "url": "https://info.ubeswap.org/token/0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5",
  "liquidityUSD": 6094809.639784346,
  "volumeUSD": 2343496099.964215
}
```

# Interact with Toucan's Contracts?

You can always access any method or property of the BCT, NCT and TCO2 contracts by first getting and storing them in a variable, like so:

```typescript
toucan.setSigner(signer);

const nct = await toucan.getPoolContract("NCT");
const tco2 = await toucan.getTCO2Contract(tco2Address);
const registry = await toucan.getRegistryContract();
const remainingTCO2 = await nct.tokenBalances(tco2Address);
```

This is useful if you need to interact with a method of our contracts that hasn't been implemented in the SDK yet.

It's important to note that, if you want to use write methods you need to have a signer set!

## Example to retire Carbon Credits

To retire Carbon Credits on mainnet, you will have to get Carbon Pool Tokens from a DEX like Ubeswap, which you need to redeem for TCO2s. You can then retire these and get a certificate for that. If you already own NCTs, you can follow this example. In case you don't and are developing on testnet, you can also just get some at the [Toucan Faucet](https://faucet.toucan.earth). You can find more ways to retire in our [documentation](https://docs.toucan.earth/toucan/dev-resources/smart-contracts/tco2).

**Redeem your Pool Tokens and get an array of redeemed TCO2s**

```typescript
const tco2addresses = await toucan.redeemAuto2("NCT", parseEther("1"));
```

**Retire the Carbon Credits**

```typescript
await toucan.retire(parseEther("1"), tco2addresses[0].address);
```

# Subgraph queries

Now, the above example of selective retirement is only useful in specific cases.

**What if you only have the name or symbol of the project?**

That's where subgraph queries come in handy. (and we have plenty of those 😉) - But feel free to also [create your own](#custom-queries).

**_Make sure all addresses are input in lowercase letters, as the queries are case sensitive._**

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

## All queries:

Toucan SDK offers a lot of pre-defined queries. Try them out!

```typescript
// Fetch the batches of a user.
fetchUserBatches(address: string);

// Fetch TCO2 token by it's address to get details like name, symbol, address and projectVintage.
fetchTCO2TokenById(address: string);

// Fetch TCO2Token with the symbol to get details like name, symbol, address and projectVintage. A symbol would look like this: `TCO2-VCS-<projectId>-YYYY`. Make sure to input the full symbol.
fetchTCO2TokenByFullSymbol(symbol: string);

// Fetch all TCO2s details like name, symbol, address and projectVintage.

fetchAllTCO2Tokens();

// Fetch all user retirements to get information like creationTX, amount, token details and certificate details.
fetchUserRetirements(address: string, first?: number, skip?: number);

// Fetch all redeems of a given pool to get information like amount, creator and token details. Only accepts the Pooltypes "NCT" or "BCT".
fetchRedeems(poolSymbol: Pooltypes, first?: number, skip?: number);

// Fetch all redeems of a user by pool and get information like amount and token details.
fetchUserRedeems(address: string, poolSymbol: Pooltypes, first?: number, skip?: number);

// Fetch TCO2 tokens that are part of the given pool and get information on name, amount, methodology and more.
fetchPoolContents(poolSymbol: Pooltypes, first?: number, skip?: number);

// Fetch a project by it's id to get more info on region and the standard.

fetchProjectById();

// Fetch all aggregations (including for example, tco2TotalRetired or totalCarbonBridged).
fetchAggregations();
```

## Custom queries

There's a lot more other pre-built subgraph queries that I could show you, but what I really want to show you is the `fetchCustomQuery` method.

This allows you to fetch with your own queries and can be very powerful if you know graphQL. You can also check out a lot of example queries in our subgraph [playgrounds](https://thegraph.com/hosted-service/subgraph/toucanprotocol/matic).

- Getting all infos on a project of a Carbon Credit

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

# AutoOffset using the OffsetHelper

⚠️ This part is currently under construction and can't be used. ⚠️

## AutoOffset CO2

Using the OffsetHelper methods is the easiest way to offset CO2 right now as it handles the whole process for you.

_(Uses Ubeswap/SushiSwap to acquire BCT/NCT, redeems it for TCO2s and retires them)_

This is how you do that when you want to use ETH (or the network's native currency) in your balance.

In this example, you'd be offsetting 1 TON of CO2 with carbon projects from the NCT pool.

```typescript
const offsetReceipt = await toucan.autoOffsetUsingETH("NCT", parseEther("1.0"));
```

### Don't want to spend your ETH to offset?

You can use different tokens to do it. Currently it works with USDC, WMATIC and WETH only.

```typescript
const weth = new ethers.Contract(wethAddress, wethAbi, signer);

const offsetReceipt = await toucan.autoOffsetUsingSwapToken(
  "NCT",
  parseEther("1.0"),
  weth
);
```

### Offset with your own BCT/NCT

If you already have BCT/NCT, you can use `autoOffsetUsingPoolToken()` like so:

```typescript
const offsetReceipt = await toucan.autoOffsetUsingPoolToken(
  "NCT",
  parseEther("1.0")
);
```

### Selectively Offset CO2

You may want to selectively offset certain carbon projects. You can do that too.

Assuming you already have some NCT, this example gets an array of all TCO2s in the NCT pool ascending by rank/quality.

Then redeems and retires 3 TONS of the highest ranked TCO2 it can find.

```typescript
const scoredTCO2s = await toucan.getScoredTCO2s("NCT");
const len = scoredTCO2s.length;

const redeemReceipt = await toucan.redeemMany(
  "NCT",
  [scoredTCO2s[len - 1]],
  [parseEther("3.0")]
);

const retirementReceipt = await toucan.retire(
  parseEther("3.0"),
  tco2s[len - 1].address
);
```

Of course, you could have avoided using the `getScoredTCO2s` method if you already had the address of the TCO2s you wanted to offset.

### But I want the Retirement NFT

If you do, that's also quite easy to pull off. You just replace the usage of the `retire()` method in the example above with this:

```typescript
const retirementReceipt = await toucan.retireAndMintCertificate(
  "Alex",
  signer.address,
  "Alex",
  "Just helping the planet",
  parseEther("3.0"),
  tco2s[len - 1].address
);
```

Why do you see my name twice you ask? 🤔

Well, the first "Alex" represents the entity that is doing the retirement/offset. The second one represents the party that 'benefits' from it. The address also represents the beneficiary.

That's useful in case you happen to be an entity that retires on behalf of someone else.
