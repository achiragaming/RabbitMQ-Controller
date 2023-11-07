import { Methods } from "../../Constants.js";
import { ManagementApi } from "../ManagementApi.js";

export interface Binding {
  listBindings: (vhostName?: string) => Promise<any>;
  getBindingsForSource: (
    vhostName: string,
    exchangeName: string
  ) => Promise<any>;
  getBindingsForDestination: (
    vhostName: string,
    exchangeName: string
  ) => Promise<any>;
}

export default (client: ManagementApi): Binding => {
  async function listBindings(vhostName?: string) {
    const path = `bindings/${vhostName ? encodeURIComponent(vhostName) : ""}`;
    return await client.request({
      path,
      body: {},
      method: Methods.get,
    });
  }
  async function getBindingsForSource(vhostName: string, exchangeName: string) {
    const path = `exchanges/${encodeURIComponent(
      vhostName
    )}/${encodeURIComponent(exchangeName)}/bindings/source`;

    return await client.request({
      path,
      body: {},
      method: Methods.get,
    });
  }
  async function getBindingsForDestination(
    vhostName: string,
    exchangeName: string
  ) {
    const path = `exchanges/${encodeURIComponent(
      vhostName
    )}/${encodeURIComponent(exchangeName)}/bindings/destination`;
    return await client.request({
      path,
      body: {},
      method: Methods.get,
    });
  }
  return { listBindings, getBindingsForSource, getBindingsForDestination };
};
