import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Node {
  listNodes: () => Promise<any>;
  getNode: (nodeBody: GetNodeBody) => Promise<any>;
}

interface GetNodeBody {
  name: string;
  memory?: boolean;
}

export default (client: ManagementApi): Node => {
  async function listNodes() {
    const path = "nodes";
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function getNode(nodeBody: GetNodeBody) {
    let path = `nodes/${encodeURIComponent(nodeBody.name)}`;

    if (nodeBody.memory) {
      path += "?memory=true";
    }

    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  return { listNodes, getNode };
};
