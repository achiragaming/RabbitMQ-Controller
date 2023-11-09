import amqp from "amqplib";
import { EventEmitter } from "events";
import { State, EventTypes } from "../Constants.js";
class Manager extends EventEmitter {
    constructor({ url, options = {}, maxRetryAttempts = Infinity, reconnectTimeout = 5000, callbacks = {}, }) {
        super();
        this.options = { url, maxRetryAttempts, reconnectTimeout, options };
        this.state = State.none;
        this.currentRetryAttempt = 0;
        this.client = undefined;
        this.callbacks = callbacks;
    }
    async connect() {
        if (this.state === State.destroyed)
            return this.error(new Error(`RabbitMQ Connection was destroyed`));
        if (!this.options.url)
            return this.error(new Error(`RabbitMQ Connection url not found`));
        try {
            this.client = await amqp.connect(this.options.url, this.options.options);
            this.currentRetryAttempt = 0;
            this.changeState(State.open);
            await this.emitEvent(EventTypes.open);
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
        if (this.currentRetryAttempt < this.options.maxRetryAttempts) {
            this.clear();
            this.currentRetryAttempt++;
            const retryDelay = this.currentRetryAttempt * this.options.reconnectTimeout; // Exponential backoff
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
        this.client = undefined;
    }
    changeState(state) {
        this.state = state;
    }
    async emitEvent(event, ...args) {
        this.emit(EventTypes[event], this, ...args);
        switch (event) {
            case EventTypes.open: {
                this.callbacks?.open && (await this.callbacks.open(this, ...args));
                break;
            }
            case EventTypes.closed: {
                this.callbacks?.closed && (await this.callbacks.closed(this, ...args));
                break;
            }
            case EventTypes.error: {
                this.callbacks?.error && (await this.callbacks.error(this, ...args));
                break;
            }
            case EventTypes.reconnecting: {
                this.callbacks?.reconnecting &&
                    (await this.callbacks.reconnecting(this, ...args));
                break;
            }
            case EventTypes.connecting: {
                this.callbacks?.connecting &&
                    (await this.callbacks.connecting(this, ...args));
                break;
            }
        }
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