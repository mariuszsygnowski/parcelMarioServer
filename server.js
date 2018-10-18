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

app.post('/api/createorder', (req, res) => {

  db.one(`INSERT INTO orders (id) VALUES (default) RETURNING id`)
    .then((data) => {
      res.json({ id: data.id })
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error.message });
    })
})

app.listen(8080, function () {
  console.log('Listening on port 8080');
});
