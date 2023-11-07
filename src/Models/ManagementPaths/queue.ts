import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";
import * as querystring from "querystring";

export interface Queue {
  listQueues(queueParams: ListQueuesParams): Promise<any>;
  getQueue(queueParams: GetQueueParams): Promise<any>;
  createQueue(queueParams: CreateQueueParams): Promise<any>;
  deleteQueue(queueParams: DeleteQueueParams): Promise<any>;
  getQueueBindings(queueParams: GetQueueParams): Promise<any>;
  purgeQueue(queueParams: GetQueueParams): Promise<any>;
  setQueueActions(queueParams: SetQueueActionsParams): Promise<any>;
  getMessages(messageParams: GetMessagesParams): Promise<any>;
}

interface ListQueuesParams {
  vhost?: string;
  query?: any;
}

interface GetQueueParams {
  vhost: string;
  queue: string;
}

interface CreateQueueParams {
  vhost: string;
  queue: string;
  auto_delete: boolean;
  durable: boolean;
  node: string;
  arguments: any;
}

interface DeleteQueueParams {
  vhost: string;
  queue: string;
}

interface SetQueueActionsParams {
  vhost: string;
  queue: string;
  action: string;
}

interface GetMessagesParams {
  vhost: string;
  queue: string;
  count: number;
  requeue: boolean;
  encoding: string;
  truncate: boolean;
}

export default (client: ManagementApi): Queue => {
  async function listQueues(queueParams: ListQueuesParams) {
    let path = "queues";

    if (queueParams.vhost) path += encodeURIComponent(queueParams.vhost);
    if (queueParams.query)
      path += `?${querystring.stringify(queueParams.query)}`;

    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function getQueue(queueParams: GetQueueParams) {
    const path = `queues/${encodeURIComponent(
      queueParams.vhost
    )}/${encodeURIComponent(queueParams.queue)}`;
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function createQueue(queueParams: CreateQueueParams) {
    const path = `queues/${encodeURIComponent(
      queueParams.vhost
    )}/${encodeURIComponent(queueParams.queue)}`;
    const putBody = {
      auto_delete: queueParams.auto_delete,
      durable: queueParams.durable,
      node: queueParams.node,
      arguments: queueParams.arguments,
    };
    return await client.request({
      path,
      method: Methods.put,
      body: putBody,
    });
  }

  async function deleteQueue(queueParams: DeleteQueueParams) {
    const path = `queues/${encodeURIComponent(
      queueParams.vhost
    )}/${encodeURIComponent(queueParams.queue)}`;
    return await client.request({
      path,
      method: Methods.delete,
      body: {},
    });
  }

  async function getQueueBindings(queueParams: GetQueueParams) {
    const path = `queues/${encodeURIComponent(
      queueParams.vhost
    )}/${encodeURIComponent(queueParams.queue)}/bindings`;
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function purgeQueue(queueParams: GetQueueParams) {
    const path = `queues/${encodeURIComponent(
      queueParams.vhost
    )}/${encodeURIComponent(queueParams.queue)}/contents`;
    return await client.request({
      path,
      method: Methods.delete,
      body: {},
    });
  }

  async function setQueueActions(queueParams: SetQueueActionsParams) {
    const path = `queues/${encodeURIComponent(
      queueParams.vhost
    )}/${encodeURIComponent(queueParams.queue)}/actions`;
    return await client.request({
      path,
      method: Methods.post,
      body: { action: queueParams.action },
    });
  }

  async function getMessages(messageParams: GetMessagesParams) {
    const path = `queues/${encodeURIComponent(
      messageParams.vhost
    )}/${encodeURIComponent(messageParams.queue)}/get`;
    const postBody = {
      count: messageParams.count,
      requeue: messageParams.requeue,
      encoding: messageParams.encoding,
      truncate: messageParams.truncate,
    };
    return await client.request({
      path,
      method: Methods.post,
      body: postBody,
    });
  }

  return {
    listQueues,
    getQueue,
    createQueue,
    deleteQueue,
    getQueueBindings,
    purgeQueue,
    setQueueActions,
    getMessages,
  };
};
