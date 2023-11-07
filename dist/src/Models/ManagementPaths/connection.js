import { Methods } from "../../Constants.js";
export default (client) => {
    async function listConnections() {
        return await client.request({
            path: "connections",
            method: Methods.get,
            body: {},
        });
    }
    async function getConnection(connectionName) {
        return await client.request({
            path: `connections/${encodeURIComponent(connectionName)}`,
            method: Methods.get,
            body: {},
        });
    }
    async function closeConnection(connectionName) {
        return await client.request({
            path: `connections/${encodeURIComponent(connectionName)}`,
            method: Methods.delete,
            body: {},
        });
    }
    return { listConnections, getConnection, closeConnection };
};
//# sourceMappingURL=connection.js.map