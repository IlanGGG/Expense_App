const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expensesRoutes = require("./routes/expenses");
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/expense", {
  useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/", expensesRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
