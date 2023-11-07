import { Methods } from "../../Constants.js";
import * as querystring from "querystring";
export default (client) => {
    async function listQueues(queueParams) {
        let path = "queues";
        if (queueParams.vhost)
            path += encodeURIComponent(queueParams.vhost);
        if (queueParams.query)
            path += `?${querystring.stringify(queueParams.query)}`;
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function getQueue(queueParams) {
        const path = `queues/${encodeURIComponent(queueParams.vhost)}/${encodeURIComponent(queueParams.queue)}`;
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function createQueue(queueParams) {
        const path = `queues/${encodeURIComponent(queueParams.vhost)}/${encodeURIComponent(queueParams.queue)}`;
        const putBody = {
            auto_delete: queueParams.auto_delete,
            durable: queueParams.durable,
            node: queueParams.node,
            arguments: queueParams.arguments,
        };
        return await client.request({
            path,
            method: Methods.put,
            body: putBody,
        });
    }
    async function deleteQueue(queueParams) {
        const path = `queues/${encodeURIComponent(queueParams.vhost)}/${encodeURIComponent(queueParams.queue)}`;
        return await client.request({
            path,
            method: Methods.delete,
            body: {},
        });
    }
    async function getQueueBindings(queueParams) {
        const path = `queues/${encodeURIComponent(queueParams.vhost)}/${encodeURIComponent(queueParams.queue)}/bindings`;
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function purgeQueue(queueParams) {
        const path = `queues/${encodeURIComponent(queueParams.vhost)}/${encodeURIComponent(queueParams.queue)}/contents`;
        return await client.request({
            path,
            method: Methods.delete,
            body: {},
        });
    }
    async function setQueueActions(queueParams) {
        const path = `queues/${encodeURIComponent(queueParams.vhost)}/${encodeURIComponent(queueParams.queue)}/actions`;
        return await client.request({
            path,
            method: Methods.post,
            body: { action: queueParams.action },
        });
    }
    async function getMessages(messageParams) {
        const path = `queues/${encodeURIComponent(messageParams.vhost)}/${encodeURIComponent(messageParams.queue)}/get`;
        const postBody = {
            count: messageParams.count,
            requeue: messageParams.requeue,
            encoding: messageParams.encoding,
            truncate: messageParams.truncate,
        };
        return await client.request({
            path,
            method: Methods.post,
            body: postBody,
        });
    }
    return {
        listQueues,
        getQueue,
        createQueue,
        deleteQueue,
        getQueueBindings,
        purgeQueue,
        setQueueActions,
        getMessages,
    };
};
//# sourceMappingURL=queue.js.map