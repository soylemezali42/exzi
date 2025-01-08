import { Server } from "socket.io";
import mockData from "../utils/mockData.js";

class WebSocketService {
  constructor({ httpServer, redisService, logger }) {
    this.socketIO = new Server(httpServer);
    this.redisService = redisService;
    this.logger = logger;

    this.start();
  }

  start() {
    // Start a new WebSocket Server
    this.socketIO.on("connection", (socket) => {
      this.logger.info(`New WebSocket connection established: ${socket.id}`);

      socket.on("subscribe-pair", ({ pair }) => {
        this.subscribePair(socket, pair);
      });

      socket.on("unsubscribe-pair", ({ pair }) => {
        this.unsubscribePair(socket, pair);
      });

      socket.on("disconnect", () => {
        this.logger.info(`WebSocket connection closed: ${socket.id}`);
      });
    });
  }

  subscribePair(socket, pair) {
    this.logger.info(`Socket ${socket.id} subscribed: ${pair}`);
    socket.join(pair);
  }

  unsubscribePair(socket, pair) {
    this.logger.info(`Socket ${socket.id} unsubscribed: ${pair}`);
    socket.leave(pair);
  }

  broadCastPair(pair, data) {
    this.socketIO.to(pair).emit("orderBookChanges", data);
  }

  async subscribeRedis(pair) {
    await this.redisService.subscribeMessage(pair, (message) => {
      this.broadCastPair(pair, JSON.parse(message));
    });
  }

  async initializeRedisPairSubscription() {
    const keys = Object.keys(mockData);
    for (const key of keys) {
      await this.subscribeRedis(key);
    }
  }
}

export default WebSocketService;
