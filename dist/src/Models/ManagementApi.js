import axios from "axios";
import connection from "./ManagementPaths/connection.js";
import binding from "./ManagementPaths/binding.js";
import channel from "./ManagementPaths/channel.js";
import cluster from "./ManagementPaths/cluster.js";
import definition from "./ManagementPaths/definition.js";
import exchange from "./ManagementPaths/exchange.js";
import vhost from "./ManagementPaths/vhost.js";
import queue from "./ManagementPaths/queue.js";
import node from "./ManagementPaths/node.js";
import message from "./ManagementPaths/message.js";
import generic from "./ManagementPaths/generic.js";
class ManagementApi {
    constructor({ url, username, password }) {
        this.options = { url, username, password };
        this.baseUrl = `${url}/api`;
        this.binding = binding(this);
        this.channel = channel(this);
        this.cluster = cluster(this);
        this.connection = connection(this);
        this.definition = definition(this);
        this.exchange = exchange(this);
        this.generic = generic(this);
        this.message = message(this);
        this.node = node(this);
        this.queue = queue(this);
        this.vhost = vhost(this);
    }
    async request({ path, method, body }) {
        const authorization = `Basic ${Buffer.from(`${this.options.username}:${this.options.password}`, "utf8").toString("base64")}`;
        const config = {
            url: `${this.baseUrl}/${path}`,
            method,
            data: body,
            headers: {
                Authorization: authorization,
            },
        };
        try {
            const response = await axios(config);
            return response.data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export { ManagementApi };
//# sourceMappingURL=ManagementApi.js.map