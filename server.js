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
 * {
  "items": [
    { "menuItemId": 1, "quantity": 10 },
    { "menuItemId": 2, "quantity": 3 }
  ],
  "name": 'mario',
  "details": "acees code 1234"
}
 */

app.post("/api/order", (req, res) => {
   //this will be additional informations to order like name, phone number or how to enter to bulding
  const detailsOfOrder = req.body.details_of_order; 
  // 1. insert into "order" table
  db.one("INSERT INTO orders (id, details_of_order) VALUES (DEFAULT, $1) RETURNING id, details_of_order", [detailsOfOrder])
  .then(result => {
    
      const detailsOfOrderFromServer = result.details_of_order;
      const orderId = result.id;
      const deliveryPrice = result.delivery_price;
      const { items } = req.body;
      // console.log(detailsOfOrderFromServer);
      
      // 2. insert into "order_item" table for each item
      return Promise.all(items.map(item => {
        // console.log(item);
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
  db.any('SELECT menu.id, menu.name, order_details.quantity FROM menu, order_details, orders WHERE order_details.order_id = $1 AND order_details.item_id = menu.id AND orders.id = order_details.item_id', [orderId])
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
