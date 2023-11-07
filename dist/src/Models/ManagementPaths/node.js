import { Methods } from "../../Constants.js";
export default (client) => {
    async function listNodes() {
        const path = "nodes";
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function getNode(nodeBody) {
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
//# sourceMappingURL=node.js.map