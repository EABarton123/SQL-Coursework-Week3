const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "test",
  host: "localhost",
  database: "cyf_ecommerce_api",
  password: "1234",
  port: 5432,
});

app.get("/customers", (request, response) => {
  pool
    .query("SELECT * FROM customers")
    .then((data) => response.send(data.rows));
});

app.get("/suppliers", (request, response) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((data) => response.send(data.rows));
});

app.get("/products?name=name", (request, response) => {
  const name = req.query.name;
  pool
    .query(
      "SELECT product_name, unit_price, supplier_name FROM ((product_availability INNER JOIN suppliers ON supp_id=supp_id) INNER JOIN products ON prod_id=prod_id) WHERE product_name LIKE '%cups%'"
    )
    .then((name) => response.send(name.rows));
});

app.post;

app.listen(port, () => {
  console.log("server is running");
});
