import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Channel {
  listChannels: (vhostName?: string, connectionName?: string) => Promise<any>;
  getChannel: (channel: string) => Promise<any>;
}

export default (client: ManagementApi): Channel => {
  async function listChannels(vhostName?: string, connectionName?: string) {
    let path = "channels"; // Remove the first slash

    if (vhostName) {
      path = `vhosts/${encodeURIComponent(vhostName)}/channels`; // Remove the first slash
    }

    if (connectionName) {
      path = `connections/${encodeURIComponent(connectionName)}/channels`; // Remove the first slash
    }

    return client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function getChannel(channel: string) {
    const path = `channels/${encodeURIComponent(channel)}`; // Remove the first slash
    return client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  return { listChannels, getChannel };
};
