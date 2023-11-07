import { Methods } from "../../Constants.js";
export default (client) => {
    async function listChannels(vhostName, connectionName) {
        let path = "channels"; // Remove the first slash
        if (vhostName) {
            path = `vhosts/${encodeURIComponent(vhostName)}/channels`; // Remove the first slash
        }
        if (connectionName) {
            path = `connections/${encodeURIComponent(connectionName)}/channels`; // Remove the first slash
        }
        return client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function getChannel(channel) {
        const path = `channels/${encodeURIComponent(channel)}`; // Remove the first slash
        return client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    return { listChannels, getChannel };
};
//# sourceMappingURL=channel.js.map