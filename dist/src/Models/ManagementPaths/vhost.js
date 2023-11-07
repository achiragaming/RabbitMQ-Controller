import { Methods } from "../../Constants.js";
export default (client) => {
    async function listVhosts(vhostParams) {
        let path = "vhosts";
        if (vhostParams.vhost)
            path += `/${encodeURIComponent(vhostParams.vhost)}`;
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function deleteVhost(vhostParams) {
        const path = `vhosts/${encodeURIComponent(vhostParams.vhost)}`;
        return await client.request({
            path,
            method: Methods.delete,
            body: {},
        });
    }
    async function createVhost(vhostParams) {
        const path = `vhosts/${encodeURIComponent(vhostParams.vhost)}`;
        return await client.request({
            path,
            method: Methods.put,
            body: {},
        });
    }
    async function getVhostPermissions(vhostParams) {
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
//# sourceMappingURL=vhost.js.map