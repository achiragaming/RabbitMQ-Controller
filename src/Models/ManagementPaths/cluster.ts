import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Cluster {
  getClusterName: () => Promise<any>;
  setClusterName: (name: string) => Promise<any>;
}

export default (client: ManagementApi): Cluster => {
  async function getClusterName() {
    const path = "cluster-name"; // Removed the "api/" prefix
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function setClusterName(clusterName: string) {
    const path = "cluster-name"; // Removed the "api/" prefix
    return await client.request({
      path,
      method: Methods.put,
      body: { name: clusterName }, // No need to include the name in the body
    });
  }

  return { getClusterName, setClusterName };
};
