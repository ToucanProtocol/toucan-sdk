import { cacheExchange, createClient, fetchExchange } from "@urql/core";

import {
  CELO_UBESWAP_GRAPH_API_URL,
  getSubgraphURL,
  POLYGON_SUSHI_GRAPH_API_URL,
} from "./graphAPIs";

export const getToucanGraphClient = (network: string) =>
  createClient({
    url: getSubgraphURL(network),
    requestPolicy: "network-only",
    fetch: fetch,
    exchanges: [cacheExchange, fetchExchange],
  });

export const getDexGraphClient = (network: string) =>
  createClient({
    url:
      network === "polygon"
        ? POLYGON_SUSHI_GRAPH_API_URL
        : CELO_UBESWAP_GRAPH_API_URL,
    exchanges: [cacheExchange, fetchExchange],
  });
