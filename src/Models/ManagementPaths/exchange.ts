import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Exchange {
  listExchanges: (vhostName?: string) => Promise<any>;
  getExchange: (vhostName: string, exchangeName: string) => Promise<any>;
  createExchange: (exchange: ExchangeParameters) => Promise<any>;
  deleteExchange: (vhostName: string, exchangeName: string) => Promise<any>;
}

interface ExchangeParameters {
  vhost: string;
  exchange: string;
  type: string;
  auto_delete?: boolean;
  durable?: boolean;
  internal?: boolean;
  exchangeArguments?: object; // Renamed from "arguments" to "exchangeArguments"
}

export default (client: ManagementApi): Exchange => {
  async function listExchanges(vhostName?: string) {
    const path = vhostName
      ? `exchanges/${encodeURIComponent(vhostName)}`
      : "exchanges";
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function getExchange(vhostName: string, exchangeName: string) {
    const path = `exchanges/${encodeURIComponent(
      vhostName
    )}/${encodeURIComponent(exchangeName)}`;
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function createExchange(exchange: ExchangeParameters) {
    const {
      vhost,
      exchange: exchangeName,
      type,
      auto_delete,
      durable,
      internal,
      exchangeArguments,
    } = exchange;
    const putBody = {
      type,
      auto_delete,
      durable,
      internal,
      arguments: exchangeArguments, // Renamed here
    };
    const path = `exchanges/${encodeURIComponent(vhost)}/${encodeURIComponent(
      exchangeName
    )}`;
    return await client.request({
      path,
      method: Methods.put,
      body: putBody,
    });
  }

  async function deleteExchange(vhostName: string, exchangeName: string) {
    const path = `exchanges/${encodeURIComponent(
      vhostName
    )}/${encodeURIComponent(exchangeName)}`;
    return await client.request({
      path,
      method: Methods.delete,
      body: {},
    });
  }

  return { listExchanges, getExchange, createExchange, deleteExchange };
};
