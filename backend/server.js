// importing required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// importing reqired modules
const connectDB = require("./config/db");

//importing routes
const cats = require("./routes/routes");

// linking env folder
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT;

//connect to mongodb db.js in config
connectDB();

//Route middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//routing
app.use("", cats);

//starting the server
app.listen(port, () => {
  console.log(`Server is up and running @ port: ${port}, lets start editing`);
});
