import Order from "../entities/Order.js";
import OrderBook from "../entities/OrderBook.js";
import OrderType from "../entities/OrderType.js";

describe("OrderBook", () => {
  let orderBook;

  beforeEach(() => {
    orderBook = new OrderBook({ pair: "BTC/USD" });
  });

  test("orderbook is succesfully created", () => {
    expect(orderBook).toBeDefined();
    expect(orderBook).toHaveProperty("bids", []);
    expect(orderBook).toHaveProperty("asks", []);
  });

  test("serialize the orderbook", () => {
    const serialized = orderBook.serialize();

    expect(serialized).toStrictEqual('{"bids":[],"asks":[]}');
  });

  test("add a new order and sort the orderbook", () => {
    const o1 = new Order({
      id: "o1",
      pair: "BTC/USD",
      type: OrderType.BUY,
      quantity: 1,
      price: 100,
    });

    const o2 = new Order({
      id: "o2",
      pair: "BTC/USD",
      type: OrderType.BUY,
      quantity: 2,
      price: 200,
    });

    orderBook.addOrder(o1);
    orderBook.addOrder(o2);

    expect(orderBook.bids.length).toBe(2);
    expect(orderBook.bids[0].price).toBe(200);
    expect(orderBook.bids[1].quantity).toBe(1);
  });

  test("cancel the order", () => {
    const o1 = new Order({
      id: "o1",
      pair: "BTC/USD",
      type: OrderType.SELL,
      quantity: 1,
      price: 100,
    });
    orderBook.addOrder(o1);
    expect(orderBook.asks.length).toBe(1);

    orderBook.cancelOrder("o1");
    expect(orderBook.asks.length).toBe(0);
  });

  test("execute the trade", () => {
    const o1 = new Order({
      id: "o1",
      pair: "BTC/USD",
      type: OrderType.BUY,
      quantity: 1,
      price: 100,
    });

    const o2 = new Order({
      id: "o2",
      pair: "BTC/USD",
      type: OrderType.SELL,
      quantity: 1,
      price: 100,
    });

    orderBook.addOrder(o1);
    orderBook.addOrder(o2);
    const trades = orderBook.executeTrade();

    expect(trades.length).toBe(1);
    expect(orderBook.asks.length).toBe(0);
    expect(orderBook.bids.length).toBe(0);

    const o3 = new Order({
      id: "o3",
      pair: "BTC/USD",
      type: OrderType.BUY,
      quantity: 1,
      price: 900,
    });

    const o4 = new Order({
      id: "o4",
      pair: "BTC/USD",
      type: OrderType.SELL,
      quantity: 1,
      price: 2100,
    });

    orderBook.addOrder(o3);
    orderBook.addOrder(o4);
    const tradesNotPossible = orderBook.executeTrade();

    expect(tradesNotPossible).toBeNull();
    expect(orderBook.asks.length).toBe(1);
    expect(orderBook.bids.length).toBe(1);
  });
});
