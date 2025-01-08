class Order {
  constructor({ id, pair, type, quantity, price }) {
    this.id = id;
    this.pair = pair;
    this.type = type;
    this.quantity = quantity;
    this.price = price;
    this.timestamp = new Date();
  }
}

export default Order;
