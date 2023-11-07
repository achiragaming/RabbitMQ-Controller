import { Methods } from "../../Constants.js";
export default (client) => {
    async function listExchanges(vhostName) {
        const path = vhostName
            ? `exchanges/${encodeURIComponent(vhostName)}`
            : "exchanges";
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function getExchange(vhostName, exchangeName) {
        const path = `exchanges/${encodeURIComponent(vhostName)}/${encodeURIComponent(exchangeName)}`;
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function createExchange(exchange) {
        const { vhost, exchange: exchangeName, type, auto_delete, durable, internal, exchangeArguments, } = exchange;
        const putBody = {
            type,
            auto_delete,
            durable,
            internal,
            arguments: exchangeArguments, // Renamed here
        };
        const path = `exchanges/${encodeURIComponent(vhost)}/${encodeURIComponent(exchangeName)}`;
        return await client.request({
            path,
            method: Methods.put,
            body: putBody,
        });
    }
    async function deleteExchange(vhostName, exchangeName) {
        const path = `exchanges/${encodeURIComponent(vhostName)}/${encodeURIComponent(exchangeName)}`;
        return await client.request({
            path,
            method: Methods.delete,
            body: {},
        });
    }
    return { listExchanges, getExchange, createExchange, deleteExchange };
};
//# sourceMappingURL=exchange.js.map