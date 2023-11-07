import { Methods } from "./Constants.js";

export type managementTypes = {
  url: string;
  username: string;
  password: string;
};
export type managerTypes = {
  url: string;
  maxRetryAttempts: number;
  reconnectTimeout: number;
};

export type clientTypes = any;

export type requestTypes = { path: string; method: Methods; body: object };
