## Getting the RabbitMQ Instance

You can obtain the underlying RabbitMQ instance from the `node-rabbitmq-manager` package. Here's how to do it:

First, import the `Manager` class from the package into your application:

```javascript
import { Manager } from "node-rabbitmq-manager";
```

Next, create an instance of the `Manager` by providing the RabbitMQ server URL and optional configuration parameters. You can also set the maximum number of retry attempts and the reconnection timeout.

```javascript
const rabbitmqManager = new Manager(
  "amqp://localhost", // RabbitMQ server URL
  5, // Maximum retry attempts (optional)
  5000 // Reconnection timeout in milliseconds (optional)
);
```

To start the RabbitMQ connection, use the `start` method as described in the previous section:

```javascript
rabbitmqManager
  .start()
  .then(() => {
    console.log("Connected to RabbitMQ server.");
  })
  .catch((error) => {
    console.error("Error connecting to RabbitMQ server:", error);
  });
```

Once you have started the connection, you can access the RabbitMQ instance by using the `client` property of the `rabbitmqManager` object. This property provides direct access to the RabbitMQ instance created by the `amqplib` library:

```javascript
const rabbitmqConnection = rabbitmqManager.client;

// Now you can use 'rabbitmqConnection' to work with the RabbitMQ instance directly.
// For example, you can create channels, publish messages, and subscribe to queues using the 'amqplib' methods.
```

This allows you to interact with the RabbitMQ instance using the full set of methods provided by the `amqplib` library.

### Events

The RabbitMQManager emits events to notify you of various connection states and errors. You can listen to these events to handle specific scenarios in your application.

- `open`: Emitted when the connection to the RabbitMQ server is established.
- `closed`: Emitted when the connection is closed, and the controller is attempting to reconnect.
- `reconnecting`: Emitted when the controller is in the process of reconnecting.
- `connecting`: Emitted when the controller is attempting to connect to the RabbitMQ server.
- `error`: Emitted when an error occurs during the connection process.

You can use the `on` method to listen to these events and respond to them in your code:

```javascript
RabbitMQManager.on("open", (manager) => {
  console.log("RabbitMQ connection is open.");
});

RabbitMQManager.on("connecting", (manager) => {
  console.log("RabbitMQ connection is in the process of connecting.");
});

RabbitMQManager.on("error", (manager, error) => {
  console.error("RabbitMQ error:", error);
});
```

## License

This package is released under the MIT License. See the [LICENSE](LICENSE) file for details.
