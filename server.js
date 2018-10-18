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
  "name": 'mario'
}
 */

app.post("/order", (req, res) => {
  // 1. insert into "order" table
  db.one("INSERT INTO orders (id) VALUES (DEFAULT) RETURNING id")
  .then(result => {
      const orderId = result.id;
      const { items } = req.body;
      
      // 2. insert into "order_item" table for each item
      return Promise.all(items.map(item => {
        console.log(item);
        return db.none(
          "INSERT INTO order_details (order_id, item_id, quantity) VALUES ($1, $2, $3)",
          [orderId, item.item_id, item.quantity]
        );
      })).then(() => orderId);
    })
  .then(orderId => res.json({ orderId: orderId }))
  .catch(error => res.json({ error: error.message }));
});

app.get('/menu', function(req, res) {
  db.any('SELECT name, price, type FROM menu')
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
