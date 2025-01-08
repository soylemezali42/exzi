import express from "express";
import { createServer } from "http";
import WebSocketService from "./services/WebSocketService.js";
import RedisService from "./services/RedisService.js";
import OrderBookService from "./services/OrderBookService.js";
import OrderType from "./entities/OrderType.js";
import winston from "winston";

// Create logger to be used in the application
const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
});

async function main() {
  const app = express();
  app.use(express.json());
  const httpServer = createServer(app);

  // Connect to redis
  const redisService = new RedisService({ logger });
  await redisService.connectAndSeed();

  // Initialize the websocket
  const socketIO = new WebSocketService({ httpServer, redisService, logger });
  await socketIO.initializeRedisPairSubscription();
  // Initialize the Order Service
  const orderBookService = new OrderBookService({ redisService, logger });

  // Application Routes
  app.get("/", (_, res) => {
    const __dirname = import.meta.dirname;
    res.sendFile(__dirname + "/template/index.html");
  });

  // Listen to the application
  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    logger.info(`EXZI Order Books Microservice listening on port ${port}`);
  });

  // Try to send broadcast datas to the clients
  setInterval(async () => {
    const order = await orderBookService.addOrder({
      pair: "BTC/USD",
      type: OrderType.BUY,
      quantity: 10,
      price: 90000 + Math.floor(Math.random() * 150),
    });

    logger.info(`New order created: ${order.id}`);
  }, 5000);
}

main().catch((err) => {
  logger.error(`App crashed: ${err}`);
});
