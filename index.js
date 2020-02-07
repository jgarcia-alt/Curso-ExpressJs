const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

const app = express();

app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

app.get('/', function(req, res) {
    res.redirect('/products');
});

const server = app.listen(8000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});