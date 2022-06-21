import { createClient } from "@urql/core";

import { Network } from "../types";
import {
  MUMBAI_TOUCAN_GRAPH_API_URL,
  POLYGON_SUSHI_GRAPH_API,
  POLYGON_TOUCAN_GRAPH_API_URL,
} from "./graphAPIs";

export const getToucanGraphClient = (network: Network) =>
  createClient({
    url:
      network == "polygon"
        ? POLYGON_TOUCAN_GRAPH_API_URL
        : MUMBAI_TOUCAN_GRAPH_API_URL,
    requestPolicy: "network-only",
    fetch: fetch,
  });

export const getSushiGraphClient = () =>
  createClient({
    url: POLYGON_SUSHI_GRAPH_API,
  });
