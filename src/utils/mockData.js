const mockData = {
  "BTC/USD": {
    bids: [
      {
        id: "7c6284bb-c434-4108-9072-9188f98e8ef8",
        pair: "BTC/USD",
        type: "BUY",
        price: 90000,
        quantity: 1,
      },
      {
        id: "86ea514f-100a-4309-8c5d-c22517ee179c",
        pair: "BTC/USD",
        type: "BUY",
        price: 89950,
        quantity: 2,
      },
      {
        id: "87822a48-79f5-44e6-a48e-12a6f2aa3483",
        pair: "BTC/USD",
        type: "BUY",
        price: 88900,
        quantity: 1.2,
      },
    ],
    asks: [
      {
        id: "e0b8cc1f-8b8e-4ffa-b1bc-8221f1f9ef2b",
        pair: "BTC/USD",
        type: "SELL",
        price: 90100,
        quantity: 150,
      },
      {
        id: "afdbac9e-cc57-4f60-8e5d-4cebc7ce8477",
        pair: "BTC/USD",
        type: "SELL",
        price: 90200,
        quantity: 300,
      },
      {
        id: "c6900bf6-557d-4768-837c-54a24a8d81c4",
        pair: "BTC/USD",
        type: "SELL",
        price: 90300,
        quantity: 400,
      },
    ],
  },
  "ETH/EUR": {
    bids: [
      {
        id: "53ce4ec3-9ff5-47a2-83ab-4b6fe04c0ae4",
        pair: "ETH/EUR",
        type: "BUY",
        price: 1200,
        quantity: 5,
      },
      {
        id: "63f297cf-0a82-4c52-b2cb-077767b8b22a",
        pair: "ETH/EUR",
        type: "BUY",
        price: 1195,
        quantity: 3.2,
      },
      {
        id: "cbb67621-153f-4c8b-8d43-326b7fddb7b5",
        pair: "ETH/EUR",
        type: "BUY",
        price: 1190,
        quantity: 4,
      },
    ],
    asks: [
      {
        id: "bae5c166-a1e7-46ea-9805-423a358891e0",
        pair: "ETH/EUR",
        type: "SELL",
        price: 1210,
        quantity: 2,
      },
      {
        id: "202e2c76-6943-43f4-a9c0-43081427a660",
        pair: "ETH/EUR",
        type: "SELL",
        price: 1220,
        quantity: 6,
      },
      {
        id: "7b9f49e2-ae0e-46bd-8805-7a47b0abce48",
        pair: "ETH/EUR",
        type: "SELL",
        price: 1230,
        quantity: 1.5,
      },
    ],
  },
  "LTC/BTC": {
    bids: [
      {
        id: "573cf275-4a43-44f0-b251-b22fb91329d7",
        pair: "LTC/BTC",
        type: "BUY",
        price: 0.003,
        quantity: 50,
      },
      {
        id: "1383ae69-ec0a-4f02-b5e5-dccdbb9b7188",
        pair: "LTC/BTC",
        type: "BUY",
        price: 0.0029,
        quantity: 100,
      },
      {
        id: "f71e21f0-1059-42e5-b909-4ee08bdbf3a2",
        pair: "LTC/BTC",
        type: "BUY",
        price: 0.0028,
        quantity: 80,
      },
    ],
    asks: [
      {
        id: "05220ca3-6862-4769-b143-e918d05e0d16",
        pair: "LTC/BTC",
        type: "SELL",
        price: 0.0031,
        quantity: 60,
      },
      {
        id: "8479b3bd-7dc7-45b6-8eee-a5c89183cf5b",
        pair: "LTC/BTC",
        type: "SELL",
        price: 0.0032,
        quantity: 40,
      },
      {
        id: "ca38d9d6-dd73-4d2b-a253-0a347bbb6642",
        pair: "LTC/BTC",
        type: "SELL",
        price: 0.0033,
        quantity: 70,
      },
    ],
  },
  "ETH/BTC": {
    bids: [
      {
        id: "185f828e-4d8e-4830-92c5-dc7c9f4fe6dc",
        pair: "ETH/BTC",
        type: "BUY",
        price: 0.075,
        quantity: 10,
      },
      {
        id: "dfb5d250-aa62-4580-819b-e18dec1a21c1",
        pair: "ETH/BTC",
        type: "BUY",
        price: 0.0745,
        quantity: 8,
      },
      {
        id: "d0cfb7f9-1143-4bbf-9ba3-c7c840506bb8",
        pair: "ETH/BTC",
        type: "BUY",
        price: 0.074,
        quantity: 12,
      },
    ],
    asks: [
      {
        id: "26063495-dff2-4508-9be5-581cb19011e1",
        pair: "ETH/BTC",
        type: "SELL",
        price: 0.0755,
        quantity: 15,
      },
      {
        id: "3b9f36dc-e589-4dd7-8252-3b847cd16230",
        pair: "ETH/BTC",
        type: "SELL",
        price: 0.076,
        quantity: 20,
      },
      {
        id: "601668c3-39ee-48c1-b82b-4f5d8845550c",
        pair: "ETH/BTC",
        type: "SELL",
        price: 0.0765,
        quantity: 10,
      },
    ],
  },
  "DOGE/USDT": {
    bids: [
      {
        id: "a2613ebc-ea82-4c91-acf8-cb276e2aca89",
        pair: "DOGE/USDT",
        type: "BUY",
        price: 0.075,
        quantity: 2000,
      },
      {
        id: "c18e4798-fb94-4ba2-9b97-5dbf71157afd",
        pair: "DOGE/USDT",
        type: "BUY",
        price: 0.074,
        quantity: 2500,
      },
      {
        id: "d55da3a1-345a-45be-823c-cec7c420fc80",
        pair: "DOGE/USDT",
        type: "BUY",
        price: 0.073,
        quantity: 1800,
      },
    ],
    asks: [
      {
        id: "2e901801-26d3-4859-8426-6fbb33abe80c",
        pair: "DOGE/USDT",
        type: "SELL",
        price: 0.076,
        quantity: 2200,
      },
      {
        id: "f15bc477-1b8c-4d70-b749-135e0ece231d",
        pair: "DOGE/USDT",
        type: "SELL",
        price: 0.077,
        quantity: 2400,
      },
      {
        id: "1c68973d-dc0c-4ad2-acfd-ffc97a430746",
        pair: "DOGE/USDT",
        type: "SELL",
        price: 0.078,
        quantity: 2100,
      },
    ],
  },
};

export default mockData;
