**toucan-sdk**

***

![Toucan logo](_media/GitHub-header.jpg)

# Toucan SDK

[![NPM Package](https://img.shields.io/npm/v/toucan-sdk.svg)](https://www.npmjs.com/package/toucan-sdk)

The Toucan SDK allows developers to build using [Toucan
Protocol](https://toucan.earth/)'s infrastructure on
[Celo](https://celo.org/), [Base](https://www.base.org/), and
[Polygon](https://polygon.technology/).  It provides a set of
functions that allow developers to interact with Toucan Protocol's
smart contracts and subgraphs.  This includes redeeming of pool tokens
and retirements of carbon credits, as well as querying data on
projects and retirements.

For full documentation about Toucan Protocol, please visit
<https://docs.toucan.earth/>.

⚠️ This SDK is under development.  If you run into issues, please see
[the `CONTRIBUTING` file](documents/CONTRIBUTING.md). ⚠️

## Tech stack

- [Typescript](https://www.typescriptlang.org/) - works in the web browser and Node.js.
- [Ethers.js](https://docs.ethers.io/v5/)
- [TheGraph](https://thegraph.com) for indexing of blockchain data

## Install and setup

```
npm i toucan-sdk
```

or

```
yarn add toucan-sdk
```

Now, copy `.env.example` to `.env`.

Before you can make Subgraph queries, you need to set `GRAPH_API_KEY`
in your `.env` file.  You can create an API key in [The Graph
Studio](https://thegraph.com/studio/apikeys/) after connecting your
wallet.

# Quick start

Instantiate the ToucanClient and set a `signer` & `provider` to
interact with our infrastructure.

We recommend using [ethers.js
^5.6.4](https://docs.ethers.org/v5/api/signer/) for the signer and
provider.  When you are considering using
[wagmi](https://0.3.x.wagmi.sh/docs/hooks/useSigner), only versions
under 1.0 will work as this library has not yet been upgraded to viem.

## [ethers.js](https://docs.ethers.org/v5/api/signer/)

```typescript
import ToucanClient from "toucan-sdk";
import { ethers } from "ethers";

// ethers signer and provider
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/polygon"
);

// make sure to set your private key in your .env file
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// set signer & provider
const toucan = new ToucanClient("alfajores", provider, signer);
```

## [wagmi](https://0.3.x.wagmi.sh/docs/hooks/useSigner)

```typescript
import { ToucanClient } from "toucan-sdk";
import { useProvider, useSigner } from "wagmi";

// get signer & provider
const { data: signer } = useSigner();
const provider = useProvider();

// set signer & provider
const toucan = new ToucanClient("alfajores", provider, signer);
```

You could also set the signer/provider later if you prefer that. They
are optional. But you will need to set them if you want to interact
with contracts. The provider is read-only, while the signer allows
both writing to and reading from the blockchain.

```typescript
import ToucanClient from "toucan-sdk";

const toucan = new ToucanClient("alfajores");
toucan.setProvider(provider);
toucan.setSigner(signer);
```

If you don't have a signer nor a provider set, you can only interact
with the subgraph.

# Interact with Toucan's contracts

You can always access any method or property of the pool and TCO2
[contracts](https://github.com/ToucanProtocol/contracts) by first
getting and storing them in a variable, like this:

```typescript
toucan.setSigner(signer);

const nct = await toucan.getPoolContract("NCT");
const tco2 = await toucan.getTCO2Contract(tco2Address);
const registry = await toucan.getRegistryContract();
const remainingTCO2 = await nct.tokenBalances(tco2Address);
```

This is useful if you need to interact with a method of our contracts
that hasn't been implemented in the SDK yet.

It's important to note that, if you want to use write methods you need
to have a signer set in your ToucanClient!

## Example to retire Carbon Credits

To retire Carbon Credits on mainnet, you will have to get Carbon Pool
Tokens from a DEX like [Uniswap](https://uniswap.org), which you need
to redeem for TCO2s. You can then retire TCO2s and get a certificate
for the retirement. If you already own NCTs, you can follow this
example. In case you don't and are developing on testnet, you can also
just get some at the [Toucan Faucet](https://faucet.toucan.earth). You
can find more ways to retire in our
[documentation](https://docs.toucan.earth/developers/smart-contracts/tco2).

**Redeem your Pool Tokens and get an array of redeemed TCO2s**

```typescript
const tco2Addresses = await toucan.redeemAuto("NCT", parseEther("1"));
```

**Retire the Carbon Credits**

```typescript
await toucan.retire(parseEther("1"), tco2Addresses[0].address);
```

# Subgraph queries

Now, the above example of selective retirement is only useful in
specific cases.

**What if you only have the name or symbol of the project?**

That's where subgraph queries come in handy (and we have plenty of
those 😉) - but feel free to also [create your own](#custom-queries).

**_Make sure all addresses are input in lowercase letters, as the
queries are case sensitive._**

## Fetching a TCO2 by its symbol

```typescript
const tco2 = await toucan.fetchTCO2TokenByFullSymbol("TCO2-VCS-1718-2013");
```

The result will look like this:

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

## All queries

Toucan SDK offers a lot of pre-defined queries. Try them out!

```typescript
import { ToucanClient } from "toucan-sdk";

// here we don't need to set the signer or provider
const toucan = new ToucanClient("alfajores");

// Fetch the batches of a user.
await toucan.fetchUserBatches(address: string, first?: number, skip?: number);

// Fetch TCO2 token by its address to get details like name, symbol, address and projectVintage.
await toucan.fetchTCO2TokenById(address: string);

// Fetch TCO2Token with the symbol to get details like name, symbol, address and projectVintage. A symbol would look like this: `TCO2-VCS-<projectId>-YYYY`. Make sure to input the full symbol.
await toucan.fetchTCO2TokenByFullSymbol(symbol: string);

// Fetch all TCO2s details like name, symbol, address and projectVintage.
await toucan.fetchAllTCO2Tokens(first?: number, skip?: number);

// Fetch all user retirements to get information like creationTX, amount, token details and certificate details.
await toucan.fetchUserRetirements(address: string, first?: number, skip?: number);

// Fetch all redeems of a given pool to get information like amount, creator and token details. Only accepts the Pooltypes "NCT" or "BCT".
await toucan.fetchRedeems(poolSymbol: Pooltypes, first?: number, skip?: number);

// Fetch all redeems of a user by pool and get information like amount and token details.
await toucan.fetchUserRedeems(address: string, poolSymbol: Pooltypes, first?: number, skip?: number);

// Fetch TCO2 tokens that are part of the given pool and get information on name, amount, methodology and more.
await toucan.fetchPoolContents(poolSymbol: Pooltypes, first?: number, skip?: number);

// Fetch a project by it's id (e.g., Verra Project ID) to get more info on region and the standard.
await toucan.fetchProjectById(id: string);

// Fetch all aggregations (including for example, tco2TotalRetired or totalCarbonBridged).
await toucan.fetchAggregations();
```

## Custom queries

Now that you have an overview of our pre-build queries, let's have a
look at the `fetchCustomQuery` method.

This allows you to fetch with your own queries and can be very
powerful if you know GraphQL. You can also check out a lot of example
queries in our Subgraph playgrounds:

- [Matic](https://thegraph.com/explorer/subgraphs/FU5APMSSCqcRy9jy56aXJiGV3PQmFQHg2tzukvSJBgwW)
- [Celo](https://thegraph.com/explorer/subgraphs/BWmN569zDopYXp3nzDukJsGDHqRstYAFULFPH8rxyVBk)
- [Base](https://thegraph.com/explorer/subgraphs/AEJ5PEDye6Z198HRQBioG6mZ6ZacHenBg2HTopZPsUCi)
- [Alfajores](https://thegraph.com/explorer/subgraphs/4uY2L3vQW8XKYPrFFk4i6ZuJkgbpJ8SbJayc8wzMBRYw)
- [Base Sepolia](https://thegraph.com/explorer/subgraphs/2oKCq3rDwdYPSao4UbDZKSNbawEdhBVf3BxmqJzFe1uj)
- [Amoy](https://thegraph.com/explorer/subgraphs/FKzFZuYHxyHiiDmdW9Qvwtet1Ad1ERsvjWMhhqd9V8pk)

- Getting all infos on a carbon project (`region` stands for the
  country)

  ```typescript
  import { gql } from "@urql/core";
  import { ToucanClient } from "toucan-sdk";

  const toucan = new ToucanClient("alfajores");

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

# Auto Offset using the OffsetHelper

Using the OffsetHelper SDK methods to interface with [the OffsetHelper
smart contract](https://github.com/ToucanProtocol/OffsetHelper) is the
easiest way to offset CO2 right now as it handles the whole process
for you.

_(Uses Ubeswap/SushiSwap to acquire pool tokens, redeems pool tokens
for TCO2s and retires TCO2s)_

This is how you do that when you want to use ETH (or the network's
native currency) in your balance.

In this example, you'd be offsetting 1 ton of CO2 with carbon projects
from the NCT pool.

```typescript
const offsetReceipt = await toucan.autoOffsetExactOutETH(
  "NCT",
  parseEther("1.0")
);
```

### Don't want to spend your ETH to offset?

You can use different tokens to do it. Currently it works with cUSD,
USDC, WMATIC and WETH.

```typescript
const weth = new ethers.Contract(wethAddress, wethAbi, signer);

const offsetReceipt = await toucan.autoOffsetExactInToken(
  "NCT",
  parseEther("1.0"),
  weth
);
```

### Offset with your pool tokens

If you already have pool tokens (eg. NCT,) you can use
`autoOffsetPoolToken()` like this:

```typescript
const offsetReceipt = await toucan.autoOffsetPoolToken(
  "NCT",
  parseEther("1.0")
);
```

### Selectively offset CO2

You may want to selectively offset certain carbon projects. You can do
that too.

Assuming you already have some NCT, this example gets an array of all
TCO2s in the NCT pool ascending by rank/quality.

Then redeems and retires 3 tons of the highest ranked TCO2 it can
find.

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

Of course, you could have avoided using the `getScoredTCO2s` method if
you already had the address of the TCO2s you wanted to offset.

### But I want the Retirement NFT

If you do, that's also quite easy to pull off. You just replace the
usage of the `retire()` method in the example above with this:

```typescript
const retirementReceipt = await toucan.retireAndMintCertificate(
  "Alice",
  bobsAddress,
  "Bob",
  "Just helping the planet",
  parseEther("3.0"),
  tco2s[len - 1].address
);
```

"Alice" represents the entity that is doing the retirement/offset. The
second name represents the party that 'benefits' from it, in this case
"Bob". We will also add Bob's address so now the relation of the
certificate is set to that address instead of the retiring party.

This useful in case you happen to be an entity that retires on behalf
of someone else.

## Fetch pool prices from a DEX

**IMPORTANT: Fetching pool prices is currently not working. We are
working on a fix for this.**

You can find pools for Toucan pool tokens on [Celo
Network](https://celo.org) at [Uniswap](https://uniswap.org/) and for
[Polygon Network](https://polygon.technology) on
[SushiSwap](https://sushi.com).

Something that may come in handy in your applications is fetching the
USD price of our pool tokens.

```typescript
nctPrice = await toucan.fetchTokenPriceOnDex("NCT");
```

The object returned by the above method will look like this:

```json
{
  "price": 0.6729727912290213,
  "url": "https://info.ubeswap.org/token/0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5",
  "liquidityUSD": 6094809.639784346,
  "volumeUSD": 2343496099.964215
}
```

# Contributing

Please see [the `CONTRIBUTING` file](documents/CONTRIBUTING.md).
