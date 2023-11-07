import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";
import * as querystring from "querystring";

export interface Generic {
  overview: () => Promise<any>;
  listExtensions: () => Promise<any>;
  listConsumers: (
    vhostName?: string,
    query?: Record<string, string>
  ) => Promise<any>;
  publishMessage: (messageBody: PublishMessageBody) => Promise<any>;
}

interface PublishMessageBody {
  vhost: string;
  exchange: string;
  properties: any;
  routing_key: string;
  payload: any;
  payload_encoding: string;
}

export default (client: ManagementApi): Generic => {
  async function overview() {
    const path = "cluster-name";
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function listExtensions() {
    const path = "extensions";
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function listConsumers(
    vhostName?: string,
    query?: Record<string, string>
  ) {
    let path = "consumers";
    if (vhostName) path += "/" + encodeURIComponent(vhostName);
    if (query) path += `?${querystring.stringify(query)}`;
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function publishMessage(messageBody: PublishMessageBody) {
    const path = `exchanges/${encodeURIComponent(
      messageBody.vhost
    )}/${encodeURIComponent(messageBody.exchange)}/bindings/destination`;
    const postBody = {
      properties: messageBody.properties,
      routing_key: messageBody.routing_key,
      payload: messageBody.payload,
      payload_encoding: messageBody.payload_encoding,
    };
    return await client.request({
      path,
      method: Methods.post,
      body: postBody,
    });
  }

  return {
    overview,
    listExtensions,
    listConsumers,
    publishMessage,
  };
};
