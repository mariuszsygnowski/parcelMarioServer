require('dotenv').config();

const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const express = require('express');
const app = express();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  }
};

app.get('/', function (req, res) {
  res.render('index');
});

/**
 * example of object to be passed into app.post("/api/order"
{
  "items": [
    { "item_id": 1, "quantity": 10 },
    { "item_id": 2, "quantity": 3},
    { "item_id": 3, "quantity": 2},
    { "item_id": 9, "quantity": 41}
  ],
  "details_of_order": "Mario, 012345678, please kock 3 times"
}
 */

app.post("/api/order", (req, res) => {
   //this will be additional informations to order like name, phone number or how to enter to bulding
  const detailsOfOrder = req.body.details_of_order; 
  const deliveryPrice = 1;
  // 1. insert into "order" table
  db.one("INSERT INTO orders (id, details_of_order, delivery_price) VALUES (DEFAULT, $1, $2) RETURNING id", [detailsOfOrder, deliveryPrice])
  .then(result => { 
      const orderId = result.id;
      const { items } = req.body;
      // 2. insert into "order_item" table for each item
      return Promise.all(items.map(item => {
        return db.none(
          "INSERT INTO order_details (order_id, item_id, quantity) VALUES ($1, $2, $3)",
          [orderId, item.item_id, item.quantity]
        );
      })).then(() => orderId);
    })
  .then(orderId => res.json({ orderId: orderId }))
  .catch(error => res.json({ error: error.message }));
});

app.get('/api/menu', function(req, res) {
  db.any('SELECT name, price, type FROM menu')
  .then(data => {
      res.json(data)
  })
  .catch(() => {
      res.json({error: error.message});
  })
})

app.get('/api/order/:orderId', function(req, res) {
  const orderId = req.params.orderId;
  db.any('SELECT menu.id, menu.name, menu.type, order_details.quantity, orders.delivery_price, orders.details_of_order FROM menu, order_details, orders WHERE order_details.order_id = $1 AND order_details.item_id = menu.id AND orders.id = $1', [orderId])
  .then(data => {
      res.json(data)
  })
  .catch(() => {
      res.json({error: error.message});
  })
})

app.listen(8080, function () {
  console.log('Listening on port 8080');
});
