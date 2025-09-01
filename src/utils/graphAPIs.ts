// Description: This file contains the API URLs for the subgraphs used in the project.
// Links are sourced from https://docs.toucan.earth/developers/sdk/subgraph

const { GRAPH_API_KEY } = process.env;

export const POLYGON_SUSHI_GRAPH_API_URL =
  "https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange";
export const CELO_UBESWAP_GRAPH_API_URL =
  "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap";

const networkToSubgraphURL: Record<string, string> = {
  alfajores: `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/4uY2L3vQW8XKYPrFFk4i6ZuJkgbpJ8SbJayc8wzMBRYw`,
  amoy: `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/FKzFZuYHxyHiiDmdW9Qvwtet1Ad1ERsvjWMhhqd9V8pk`,
  "base-sepolia": `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/2oKCq3rDwdYPSao4UbDZKSNbawEdhBVf3BxmqJzFe1uj`,
  base: `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/AEJ5PEDye6Z198HRQBioG6mZ6ZacHenBg2HTopZPsUCi`,
  celo: `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/BWmN569zDopYXp3nzDukJsGDHqRstYAFULFPH8rxyVBk`,
  matic: `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/FU5APMSSCqcRy9jy56aXJiGV3PQmFQHg2tzukvSJBgwW`,
  polygon: `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/FU5APMSSCqcRy9jy56aXJiGV3PQmFQHg2tzukvSJBgwW`,
} as const;

export const getSubgraphURL = (network: string) => {
  const url = networkToSubgraphURL[network];
  if (!url) throw new Error(`Subgraph URL not found for network: ${network}`);
  return url;
};
