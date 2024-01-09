// imports
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// env file
require("dotenv").config();
const PORT = process.env.PORT;

// database connection called here
require("./database/connection");

//  middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
