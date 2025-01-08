import { createClient } from "redis";
import { orderBookHashKey } from "../utils/redisHashKeys.js";
import mockData from "../utils/mockData.js";

class RedisService {
  static REDIS_CONF = {
    username: process.env.REDIS_USER_NAME,
    password: process.env.REDIS_USER_PASSWORD,
    socket: {
      host: "redis-18349.c10.us-east-1-4.ec2.redns.redis-cloud.com",
      port: 18349,
    },
  };

  constructor({ logger }) {
    this.logger = logger;
    this.publisher = createClient(RedisService.REDIS_CONF);
    this.subscriber = createClient(RedisService.REDIS_CONF);

    this.publisher.on("error", (err) => {
      this.logger.error(`Publisher Error: ${err}`);
    });
    this.subscriber.on("error", (err) => {
      this.logger.error(`Subscriber Error: ${err}`);
    });
  }

  async connectAndSeed() {
    await this.publisher.connect();
    await this.subscriber.connect();

    // Insert the mock data
    for (const [pair, orderBooks] of Object.entries(mockData)) {
      const isExist = await this.getOrderBookData(pair);
      if (!isExist) {
        await this.updateOrderBookData(pair, JSON.stringify(orderBooks));
      }
    }

    this.logger.info("Redis connection successful");
  }

  async getOrderBookData(pair) {
    try {
      const orderBookData = await this.publisher.get(orderBookHashKey(pair));
      return orderBookData ? JSON.parse(orderBookData) : null;
    } catch (err) {
      this.logger.error(`Error occured when getting the order book: ${err}`);
      return null;
    }
  }

  async updateOrderBookData(pair, orderBookPayload) {
    try {
      this.publisher.set(orderBookHashKey(pair), orderBookPayload);
    } catch (err) {
      this.logger.error(`Error occured when updating the order book: ${err}`);
    }
  }

  async publishMessage(pair, payload) {
    await this.publisher.publish(
      orderBookHashKey(pair),
      JSON.stringify(payload)
    );
  }

  async subscribeMessage(pair, callback) {
    const channel = orderBookHashKey(pair);
    await this.subscriber.subscribe(channel, (message) => {
      callback(message);
    });
  }
}

export default RedisService;
