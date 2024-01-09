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

//  middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/user", authR);


// homePage for testing google auth
app.get('/', (req, res) => { 
  res.send("<button><a href='/auth'>Login With Google</a></button>") 
}); 

// server

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
