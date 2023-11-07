import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Connection {
  listConnections: () => Promise<any>;
  getConnection: (connectionName: string) => Promise<any>;
  closeConnection: (connectionName: string) => Promise<any>;
}

export default (client: ManagementApi): Connection => {
  async function listConnections() {
    return await client.request({
      path: "connections",
      method: Methods.get,
      body: {},
    });
  }

  async function getConnection(connectionName: string) {
    return await client.request({
      path: `connections/${encodeURIComponent(connectionName)}`,
      method: Methods.get,
      body: {},
    });
  }

  async function closeConnection(connectionName: string) {
    return await client.request({
      path: `connections/${encodeURIComponent(connectionName)}`,
      method: Methods.delete,
      body: {},
    });
  }

  return { listConnections, getConnection, closeConnection };
};
