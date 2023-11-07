import { Methods } from "../../Constants.js";
export default (client) => {
    async function getClusterName() {
        const path = "cluster-name"; // Removed the "api/" prefix
        return await client.request({
            path,
            method: Methods.get,
            body: {},
        });
    }
    async function setClusterName(clusterName) {
        const path = "cluster-name"; // Removed the "api/" prefix
        return await client.request({
            path,
            method: Methods.put,
            body: { name: clusterName }, // No need to include the name in the body
        });
    }
    return { getClusterName, setClusterName };
};
//# sourceMappingURL=cluster.js.map