# RabbitMQManager

The RabbitMQManager is a TypeScript Library that provides a convenient way to manage RabbitMQ connections for Nodejs with features like automatic reconnection and error handling. It extends the `EventEmitter` class to emit events for various connection states.

## Installation

You can install the RabbitMQManager package using npm:

```bash
npm install node-rabbitmq-manager
```

## Getting Started

To use the RabbitMQManager, follow these steps:

### Import the Module

First, import the RabbitMQManager module into your application.

```javascript
import { RabbitMQManager } from "node-rabbitmq-manager";
```

### Create an Instance

Create an instance of the RabbitMQManager by providing the RabbitMQ server URL and optional configuration parameters. You can also set the maximum number of retry attempts and the reconnection timeout.

```javascript
const RabbitMQManager = new RabbitMQManager(
  "amqp://localhost", // RabbitMQ server URL
  5, // Maximum retry attempts (optional)
  5000 // Reconnection timeout in milliseconds (optional)
);
```

### Start the Connection

To start the RabbitMQ connection, call the `start` method. This method will attempt to establish a connection to the RabbitMQ server.

```javascript
RabbitMQManager.start()
  .then(() => {
    console.log("Connected to RabbitMQ server.");
  })
  .catch((error) => {
    console.error("Error connecting to RabbitMQ server:", error);
  });
```

### Events

The RabbitMQManager emits events to notify you of various connection states and errors. You can listen to these events to handle specific scenarios in your application.

- `open`: Emitted when the connection to the RabbitMQ server is established.
- `closed`: Emitted when the connection is closed, and the controller is attempting to reconnect.
- `reconnecting`: Emitted when the controller is in the process of reconnecting.
- `connecting`: Emitted when the controller is attempting to connect to the RabbitMQ server.
- `error`: Emitted when an error occurs during the connection process.

You can use the `on` method to listen to these events and respond to them in your code:

```javascript
RabbitMQManager.on("open", () => {
  console.log("RabbitMQ connection is open.");
});

RabbitMQManager.on("connecting", () => {
  console.log("RabbitMQ connection is in the process of connecting.");
});

RabbitMQManager.on("error", (error) => {
  console.error("RabbitMQ error:", error);
});
```

## License

This package is released under the MIT License. See the [LICENSE](LICENSE) file for details.

```

```
