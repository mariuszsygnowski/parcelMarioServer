CREATE DATABASE deliveryeat

CREATE TABLE menu (
id SERIAL PRIMARY KEY,
name VARCHAR (100) NOT NULL,
price NUMERIC(10,2) DEFAULT 0,
url VARCHAR (200),
description TEXT NOT NULL,
type VARCHAR (100) NOT NULL
);

INSERT INTO menu (name, price, url, description, type) VALUES ('Cheeseburger', 5, 'https://www.mymarios.com/site/wp-content/uploads/1972/06/burgers-cheeseburger.jpg', 'Another classic, the combination of this beefy Beef Patty, Cheddar Cheese, Onions, Tomatoes and Lettuce is our signature cheese burger you can’t afford to miss!', 'burgers');
INSERT INTO menu (name, price, url, description, type) VALUES ('Deluxe Burger', 6.5, 'https://www.mymarios.com/site/wp-content/uploads/1972/06/burgers-deluxe.jpg', 'Indulge the zing and savour the delectable aroma of our Deluxe burger made of our beef patty, New Zealand Cheddar Cheese, Onions, Tomatoes, Mushrooms, Pickles, Bacon and Lettuce.' ,'burgers');


CREATE TABLE orders (
id SERIAL PRIMARY KEY,
delivery_price NUMERIC(10,2) DEFAULT 2,
details_of_order TEXT
);

INSERT INTO orders (id) VALUES (default);
INSERT INTO orders (id) VALUES (default);

CREATE TABLE order_details (
id SERIAL PRIMARY KEY,
order_id INT NOT NULL,
item_id INT NOT NULL,
quantity SMALLINT,
FOREIGN KEY (order_id) REFERENCES orders (id),
FOREIGN KEY (item_id) REFERENCES menu (id)
);

INSERT INTO order_details (order_id, item_id, quantity) VALUES (1, 1, 3);
INSERT INTO order_details (order_id, item_id, quantity) VALUES (1, 2, 1);

