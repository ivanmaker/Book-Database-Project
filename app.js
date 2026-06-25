const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const dbName =
  process.env.NODE_ENV === "test" ? "boolAPI_Test" : "bookAPI";

console.log(`This is a call to the ${dbName}`);
mongoose.connect(`mongodb://localhost/${dbName}`);

const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API");
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
