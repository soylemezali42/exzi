# EXZI Order Book MicroService

This project implements a scalable, real-time order book for multiple cryptocurrency pairs using Node.js, Redis, and Socket.io.

## Features

- **Modular OOP** design: Order, OrderBook,Order Type, OrderService, RedisService, WebSocketService .
- **Redis** for caching order books and Pub/Sub broadcasts.
- **Socket.io** for live updates to subscribed clients.
- **Jest** tests with mock data.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```
