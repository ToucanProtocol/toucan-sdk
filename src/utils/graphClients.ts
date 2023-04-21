import { cacheExchange, createClient, fetchExchange } from "@urql/core";

import { Network } from "../types";
import {
  ALFAJORES_TOUCAN_GRAPH_API_URL,
  CELO_TOUCAN_GRAPH_API_URL,
  CELO_UBESWAP_GRAPH_API_URL,
  MUMBAI_TOUCAN_GRAPH_API_URL,
  POLYGON_SUSHI_GRAPH_API_URL,
  POLYGON_TOUCAN_GRAPH_API_URL,
} from "./graphAPIs";

export const getToucanGraphClient = (network: Network) =>
  createClient({
    url:
      network === "polygon"
        ? POLYGON_TOUCAN_GRAPH_API_URL
        : network === "mumbai"
        ? MUMBAI_TOUCAN_GRAPH_API_URL
        : network === "celo"
        ? CELO_TOUCAN_GRAPH_API_URL
        : ALFAJORES_TOUCAN_GRAPH_API_URL,
    requestPolicy: "network-only",
    fetch: fetch,
    exchanges: [cacheExchange, fetchExchange],
  });

export const getDexGraphClient = (network: Network) =>
  createClient({
    url:
      network === "polygon" || network === "mumbai"
        ? POLYGON_SUSHI_GRAPH_API_URL
        : CELO_UBESWAP_GRAPH_API_URL,
    exchanges: [cacheExchange, fetchExchange],
  });
