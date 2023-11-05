import amqp from "amqplib";
import { EventEmitter } from "events";
enum State {
  none = 0,
  open = 1,
  closed = 2,
  reconnecting = 3,
  connecting = 4,
  destroyed = 5,
}
class RabbitMQManager extends EventEmitter {
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
    await this.reconnect();
  }

  private error(error: Error): void {
    this.emit("error", this, error);
    throw Error;
  }
  private destroy(): void {
    this.changeState(State.destroyed);
    this.clear();
  }
  private clear(): void {
    this.client?.removeAllListeners();
    this.client = null;
  }

  private changeState(state: State): void {
    this.state = state;
    this.emit(State[this.state], this);
  }
  public async start(): Promise<this> {
    this.changeState(State.connecting);
    await this.connect();
    return this;
  }
}

export { RabbitMQManager };
