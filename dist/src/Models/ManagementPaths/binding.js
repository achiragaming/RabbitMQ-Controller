import { Methods } from "../../Constants.js";
export default (client) => {
    async function listBindings(vhostName) {
        const path = `bindings/${vhostName ? encodeURIComponent(vhostName) : ""}`;
        return await client.request({
            path,
            body: {},
            method: Methods.get,
        });
    }
    async function getBindingsForSource(vhostName, exchangeName) {
        const path = `exchanges/${encodeURIComponent(vhostName)}/${encodeURIComponent(exchangeName)}/bindings/source`;
        return await client.request({
            path,
            body: {},
            method: Methods.get,
        });
    }
    async function getBindingsForDestination(vhostName, exchangeName) {
        const path = `exchanges/${encodeURIComponent(vhostName)}/${encodeURIComponent(exchangeName)}/bindings/destination`;
        return await client.request({
            path,
            body: {},
            method: Methods.get,
        });
    }
    return { listBindings, getBindingsForSource, getBindingsForDestination };
};
//# sourceMappingURL=binding.js.map