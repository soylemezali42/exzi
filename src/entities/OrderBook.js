import OrderType from "./OrderType.js";

class OrderBook {
  constructor({ pair, bids, asks }) {
    this.pair = pair;
    this.bids = bids || [];
    this.asks = asks || [];
  }

  serialize() {
    return JSON.stringify({
      bids: this.bids,
      asks: this.asks,
    });
  }

  addOrder(order) {
    if (order.type === OrderType.BUY) {
      this.bids.push(order);
      this.bids.sort((a, b) => b.price - a.price);
    } else {
      this.asks.push(order);
      this.asks.sort((a, b) => a.price - b.price);
    }
  }

  cancelOrder(orderId) {
    if (this.bids.findIndex((order) => order.id === orderId) !== -1) {
      this.bids = this.bids.filter((order) => order.id !== orderId);
      return true;
    }

    if (this.asks.findIndex((order) => order.id === orderId) !== -1) {
      this.asks = this.asks.filter((order) => order.id !== orderId);
      return true;
    }

    return false;
  }

  executeTrade() {
    const trades = [];

    while (this.bids.length > 0 && this.asks.length > 0) {
      const maxBid = this.bids[0];
      const minAsk = this.asks[0];

      // Trade is not possible
      if (maxBid.price < minAsk.price) {
        break;
      }

      const tradableQuantity = Math.min(maxBid.quantity, minAsk.quantity);
      trades.push({
        pair: this.pair,
        quantity: tradableQuantity,
        sellingPrice: minAsk.price,
        buyingPrice: maxBid.price,
        sellOrderId: minAsk.id,
        buyOrderId: maxBid.id,
        date: new Date(),
      });

      maxBid.quantity -= tradableQuantity;
      minAsk.quantity -= tradableQuantity;

      if (maxBid.quantity === 0) this.bids.shift();
      if (minAsk.quantity === 0) this.asks.shift();
    }

    return trades.length > 0 ? trades : null;
  }
}

export default OrderBook;
