export enum State {
  none = 0,
  open = 1,
  closed = 2,
  reconnecting = 3,
  connecting = 4,
  destroyed = 5,
}
export enum EventTypes {
  open = "open",
  closed = "closed",
  reconnecting = "reconnecting",
  connecting = "connecting",
  destroyed = "destroyed",
  error = "error",
}
