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

// routes import
const authR = require("./routes/auth");
const userR = require("./routes/userRoutes");
//  middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth/user", authR);
app.use("/api/user", userR);
// for views in node project
app.set("view engine", "ejs");
app.use(express.static("public"));


// server

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
