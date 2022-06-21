import { createClient } from "@urql/core";

import { Network } from "../types";
import { MUMBAI_GRAPH_API_URL, POLYGON_GRAPH_API_URL } from "./graphAPIs";

export const getToucanGraphClient = (network: Network) =>
  createClient({
    url: network == "polygon" ? POLYGON_GRAPH_API_URL : MUMBAI_GRAPH_API_URL,
    requestPolicy: "network-only",
    fetch: fetch,
  });

export const getSushiGraphClient = () =>
  createClient({
    url: "https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange",
  });
