import { ManagementApi } from "../ManagementApi.js";
import { Methods } from "../../Constants.js";

export interface Definition {
  listDefinitions: () => Promise<any>;
  setDefinitions: (definition: string) => Promise<any>;
}

export default (client: ManagementApi): Definition => {
  async function listDefinitions() {
    const path = "definitions"; // Removed the "api/" prefix
    return await client.request({
      path,
      method: Methods.get,
      body: {},
    });
  }

  async function setDefinitions(definition: string) {
    const path = "definitions"; // Removed the "api/" prefix
    return await client.request({
      path,
      method: Methods.post,
      body: { file: definition },
    });
  }

  return { listDefinitions, setDefinitions };
};
