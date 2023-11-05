import amqp from "amqplib";
import { EventEmitter } from "events";
import { State, EventTypes } from "./Constants.js";
class Manager extends EventEmitter {
    maxRetryAttempts;
    reconnectTimeout;
    currentRetryAttempt;
    state;
    client;
    url;
    constructor(url, maxRetryAttempts = Infinity, reconnectTimeout = 5000) {
        super();
        this.url = url;
        this.maxRetryAttempts = maxRetryAttempts;
        this.reconnectTimeout = reconnectTimeout;
        this.state = State.none;
        this.currentRetryAttempt = 0;
        this.client = null;
    }
    async connect() {
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
        }
        catch (error) {
            await this.reconnect();
        }
    }
    async reconnect() {
        if (this.state === State.destroyed)
            return this.error(new Error(`Connection Max retry attempts reached. Failed to connect`));
        if (this.currentRetryAttempt < this.maxRetryAttempts) {
            this.clear();
            this.currentRetryAttempt++;
            const retryDelay = this.currentRetryAttempt * this.reconnectTimeout; // Exponential backoff
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            this.changeState(State.reconnecting);
            this.emitEvent(EventTypes.reconnecting);
            await this.connect();
        }
        else {
            this.destroy();
            this.error(new Error(`Connection Max retry attempts reached. Failed to connect`));
        }
    }
    async close() {
        this.changeState(State.closed);
        this.emitEvent(EventTypes.closed);
        await this.reconnect();
    }
    error(error) {
        this.emitEvent(EventTypes.error, error);
        throw Error;
    }
    destroy() {
        this.changeState(State.destroyed);
        this.emitEvent(EventTypes.destroyed);
        this.clear();
    }
    clear() {
        this.client?.removeAllListeners();
        this.client = null;
    }
    changeState(state) {
        this.state = state;
    }
    emitEvent(event, ...args) {
        this.emit(EventTypes[event], this, ...args);
    }
    async start() {
        this.changeState(State.connecting);
        this.emitEvent(EventTypes.connecting);
        await this.connect();
        return this;
    }
}
export { Manager };
//# sourceMappingURL=Manager.js.map