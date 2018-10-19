CREATE DATABASE deliveryeat

CREATE TABLE menu (
id SERIAL PRIMARY KEY,
name VARCHAR (100) NOT NULL,
price NUMERIC(100,2) DEFAULT 0,
type VARCHAR (100) NOT NULL
);

INSERT INTO menu (name, price, type) VALUES ('Chicken', 2, 'main');
INSERT INTO menu (name, price, type) VALUES ('Turkey', 3.5, 'main');
INSERT INTO menu (name, price, type) VALUES ('Menu with chicken, beer and cake', 10.5, 'main');
INSERT INTO menu (name, price, type) VALUES ('Beef', 5, 'main');
INSERT INTO menu (name, price, type) VALUES ('Water', 1, 'drinks');
INSERT INTO menu (name, price, type) VALUES ('Beer', 2.5, 'drinks');
INSERT INTO menu (name, price, type) VALUES ('Wine', 2.75, 'drinks');
INSERT INTO menu (name, price, type) VALUES ('Cake', 3.5, 'desserts');
INSERT INTO menu (name, price, type) VALUES ('Apple', 2.2, 'desserts');

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
INSERT INTO order_details (order_id, item_id, quantity) VALUES (1, 4, 10);
INSERT INTO order_details (order_id, item_id, quantity) VALUES (2, 1, 10);
INSERT INTO order_details (order_id, item_id, quantity) VALUES (2, 2, 4);
INSERT INTO order_details (order_id, item_id, quantity) VALUES (2, 4, 100);
