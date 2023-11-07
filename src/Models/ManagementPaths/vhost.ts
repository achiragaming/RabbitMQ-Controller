import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Vhost {
  listVhosts(vhostParams: ListVhostsParams): Promise<any>;
  deleteVhost(vhostParams: DeleteVhostParams): Promise<any>;
  createVhost(vhostParams: CreateVhostParams): Promise<any>;
  getVhostPermissions(vhostParams: GetVhostParams): Promise<any>;
}

interface ListVhostsParams {
  vhost?: string;
}

interface DeleteVhostParams {
  vhost: string;
}

interface CreateVhostParams {
  vhost: string;
}

interface GetVhostParams {
  vhost: string;
}

export default (client: ManagementApi): Vhost => {
  async function listVhosts(vhostParams: ListVhostsParams) {
    let path = "vhosts";
    if (vhostParams.vhost) path += `/${encodeURIComponent(vhostParams.vhost)}`;
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function deleteVhost(vhostParams: DeleteVhostParams) {
    const path = `vhosts/${encodeURIComponent(vhostParams.vhost)}`;
    return await client.request({
      path,
      method: Methods.delete,
      body: {},
    });
  }

  async function createVhost(vhostParams: CreateVhostParams) {
    const path = `vhosts/${encodeURIComponent(vhostParams.vhost)}`;
    return await client.request({
      path,
      method: Methods.put,
      body: {},
    });
  }

  async function getVhostPermissions(vhostParams: GetVhostParams) {
    const path = `vhosts/${encodeURIComponent(vhostParams.vhost)}/permissions`;
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  return {
    listVhosts,
    deleteVhost,
    createVhost,
    getVhostPermissions,
  };
};
