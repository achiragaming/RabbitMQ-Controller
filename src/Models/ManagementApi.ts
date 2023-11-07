import { managementTypes, requestTypes } from "../Types.js";
import axios, { AxiosRequestConfig } from "axios";
import { Manager } from "./Manager.js";
import connection, { Connection } from "./ManagementPaths/connection.js";
import binding, { Binding } from "./ManagementPaths/binding.js";
import channel, { Channel } from "./ManagementPaths/channel.js";
import cluster, { Cluster } from "./ManagementPaths/cluster.js";
import definition, { Definition } from "./ManagementPaths/definition.js";
import exchange, { Exchange } from "./ManagementPaths/exchange.js";
import vhost, { Vhost } from "./ManagementPaths/vhost.js";
import queue, { Queue } from "./ManagementPaths/queue.js";
import node, { Node } from "./ManagementPaths/node.js";
import message, { Message } from "./ManagementPaths/message.js";
import generic, { Generic } from "./ManagementPaths/generic.js";

interface ManagementApi {
  request({ path, method, body }: requestTypes): Promise<any>;
  manager: Manager;
  options: {
    url: string;
    username: string;
    password: string;
  };
  baseUrl: string;
  connection: Connection;
  binding: Binding;
  channel: Channel;
  cluster: Cluster;
  definition: Definition;
  exchange: Exchange;
  generic: Generic;
  message: Message;
  node: Node;
  queue: Queue;
  vhost: Vhost;
}

class ManagementApi {
  constructor({ url, username, password }: managementTypes) {
    this.options = { url, username, password };
    this.baseUrl = `${url}/api`;

    this.binding = binding(this);
    this.channel = channel(this);
    this.cluster = cluster(this);
    this.connection = connection(this);
    this.definition = definition(this);
    this.exchange = exchange(this);
    this.generic = generic(this);
    this.message = message(this);
    this.node = node(this);
    this.queue = queue(this);
    this.vhost = vhost(this);
  }

  async request({ path, method, body }: requestTypes) {
    const authorization: string = `Basic ${Buffer.from(
      `${this.options.username}:${this.options.password}`,
      "utf8"
    ).toString("base64")}`;

    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/${path}`,
      method,
      data: body,
      headers: {
        Authorization: authorization,
      },
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export { ManagementApi };
