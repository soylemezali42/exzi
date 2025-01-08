import { v4 as uuidv4 } from "uuid";
import Order from "../entities/Order.js";
import OrderBook from "../entities/OrderBook.js";

class OrderBookService {
  constructor({ redisService, logger }) {
    this.redisService = redisService;
    this.logger = logger;
  }

  async getOrderBook(pair) {
    const orderBookData = await this.redisService.getOrderBookData(pair);
    const orderBook = new OrderBook({
      pair,
      bids: orderBookData.bids,
      asks: orderBookData.asks,
    });

    return orderBook;
  }

  async addOrder({ pair, type, quantity, price }) {
    const order = new Order({ id: uuidv4(), pair, type, quantity, price });
    const orderBook = await this.getOrderBook(pair);
    orderBook.addOrder(order);

    // Check if a trade is possible
    const trades = orderBook.executeTrade();

    await this.redisService.updateOrderBookData(pair, orderBook.serialize());

    // Publish update
    await this.redisService.publishMessage(pair, {
      type: "ADD_ORDER",
      order,
      trades,
    });

    return order;
  }

  async cancelOrder(pair, orderId) {
    const orderBook = await this.getOrderBook(pair);
    const isOrderCanceled = orderBook.cancelOrder(orderId);
    if (!isOrderCanceled) {
      this.logger.info(`Order on found: ${orderId}`);
      return false;
    }

    this.redisService.updateOrderBookData(pair, orderBook.serialize());

    // Publish update
    await this.redisService.publishMessage(pair, {
      type: "CANCEL_ORDER",
      orderId,
    });

    return true;
  }
}

export default OrderBookService;
