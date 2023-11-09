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
  options?: Record<string, any>;
  callbacks?: {
    open?: Function;
    closed?: Function;
    error?: Function;
    connecting?: Function;
    reconnecting?: Function;
  };
};

export type clientTypes = any;

export type requestTypes = { path: string; method: Methods; body: object };
