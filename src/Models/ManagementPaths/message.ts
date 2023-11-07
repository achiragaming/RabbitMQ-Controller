import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Message {
  publishMessage: (messageBody: PublishMessageBody) => Promise<any>;
  getMessages: (messageBody: GetMessagesBody) => Promise<any>;
}

interface PublishMessageBody {
  vhost: string;
  exchange: string;
  properties: any;
  routing_key: string;
  payload: any;
  payload_encoding: string;
}

interface GetMessagesBody {
  vhost: string;
  queue: string;
  count: number;
  requeue: boolean;
  encoding: string;
  truncate?: number;
}

export default (client: ManagementApi): Message => {
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

  async function getMessages(messageBody: GetMessagesBody) {
    const path = `queues/${encodeURIComponent(
      messageBody.vhost
    )}/${encodeURIComponent(messageBody.queue)}/get`;
    const postBody = {
      count: messageBody.count,
      requeue: messageBody.requeue,
      encoding: messageBody.encoding,
      truncate: messageBody.truncate,
    };
    return await client.request({
      path,
      method: Methods.post,
      body: postBody,
    });
  }

  return { publishMessage, getMessages };
};
