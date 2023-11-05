import amqp from "amqplib";
import { EventEmitter } from "events";
import { State, EventTypes } from "./Constants.js";
class Manager extends EventEmitter {
  maxRetryAttempts: number;
  reconnectTimeout: number;
  currentRetryAttempt: number;
  state: State;
  client: amqp.Connection | null;
  url: string;
  constructor(
    url: string,
    maxRetryAttempts: number = Infinity,
    reconnectTimeout: number = 5000
  ) {
    super();
    this.url = url;
    this.maxRetryAttempts = maxRetryAttempts;
    this.reconnectTimeout = reconnectTimeout;
    this.state = State.none;
    this.currentRetryAttempt = 0;
    this.client = null;
  }

  private async connect(): Promise<void> {
    if (this.state === State.destroyed)
      return this.error(new Error(`RabbitMQ Connection was destroyed`));

    if (!this.url)
      return this.error(new Error(`RabbitMQ Connection url not found`));

    try {
      this.client = await amqp.connect(this.url);
      // Reset retry count on successful connection
      this.currentRetryAttempt = 0;
      this.changeState(State.open);
      this.emitEvent(EventTypes.open);
      this.client.on("close", this.close.bind(this));
      this.client.on("error", this.error.bind(this));
    } catch (error) {
      await this.reconnect();
    }
  }

  private async reconnect(): Promise<void> {
    if (this.state === State.destroyed)
      return this.error(
        new Error(`Connection Max retry attempts reached. Failed to connect`)
      );
    if (this.currentRetryAttempt < this.maxRetryAttempts) {
      this.clear();
      this.currentRetryAttempt++;
      const retryDelay = this.currentRetryAttempt * this.reconnectTimeout; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      this.changeState(State.reconnecting);
      this.emitEvent(EventTypes.reconnecting);
      await this.connect();
    } else {
      this.destroy();
      this.error(
        new Error(`Connection Max retry attempts reached. Failed to connect`)
      );
    }
  }

  private async close(): Promise<void> {
    this.changeState(State.closed);
    this.emitEvent(EventTypes.closed);
    await this.reconnect();
  }

  private error(error: Error): void {
    this.emitEvent(EventTypes.error, error);
    throw Error;
  }
  private destroy(): void {
    this.changeState(State.destroyed);
    this.emitEvent(EventTypes.destroyed);
    this.clear();
  }
  private clear(): void {
    this.client?.removeAllListeners();
    this.client = null;
  }

  private changeState(state: State): void {
    this.state = state;
  }
  private emitEvent(event: EventTypes, ...args: any[]): void {
    this.emit(EventTypes[event], this, ...args);
  }
  public async start(): Promise<this> {
    this.changeState(State.connecting);
    this.emitEvent(EventTypes.connecting);
    await this.connect();
    return this;
  }
}
export { Manager };
