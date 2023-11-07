import { Methods } from "../../Constants.js";
export default (client) => {
    async function listDefinitions() {
        const path = "definitions"; // Removed the "api/" prefix
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function setDefinitions(definition) {
        const path = "definitions"; // Removed the "api/" prefix
        return await client.request({
            path,
            method: Methods.post,
            body: { file: definition },
        });
    }
    return { listDefinitions, setDefinitions };
};
//# sourceMappingURL=definition.js.map