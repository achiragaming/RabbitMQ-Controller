import { Methods } from "../../Constants.js";
export default (client) => {
    async function publishMessage(messageBody) {
        const path = `exchanges/${encodeURIComponent(messageBody.vhost)}/${encodeURIComponent(messageBody.exchange)}/bindings/destination`;
        const postBody = {
            properties: messageBody.properties,
            routing_key: messageBody.routing_key,
            payload: messageBody.payload,
            payload_encoding: messageBody.payload_encoding,
        };
        return await client.request({
            path,
            method: Methods.post,
            body: postBody,
        });
    }
    async function getMessages(messageBody) {
        const path = `queues/${encodeURIComponent(messageBody.vhost)}/${encodeURIComponent(messageBody.queue)}/get`;
        const postBody = {
            count: messageBody.count,
            requeue: messageBody.requeue,
            encoding: messageBody.encoding,
            truncate: messageBody.truncate,
        };
        return await client.request({
            path,
            method: Methods.post,
            body: postBody,
        });
    }
    return { publishMessage, getMessages };
};
//# sourceMappingURL=message.js.map