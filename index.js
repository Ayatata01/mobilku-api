const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./routers/user");
const FILE = require("./helper/processFile");
const path = require("path");
require("dotenv");

// DATABASE CONFIGURATION
mongoose
  .connect(
    `mongodb://seco:seco@ac-ixm2sjd-shard-00-00.jdpfnzu.mongodb.net:27017,ac-ixm2sjd-shard-00-01.jdpfnzu.mongodb.net:27017,ac-ixm2sjd-shard-00-02.jdpfnzu.mongodb.net:27017/?ssl=true&replicaSet=atlas-cmxyzd-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// EXPRESS CONFIGURATION
const app = express();
const port = process.env.PORT || 5000;

app.use(FILE.upload.single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());

// CORS CONFIGURATION
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization , x-api-key"
  );
  next();
});

app.listen(port, () => {
  console.log("listening on port", port);
});

// ROUTER CONFIGURATION
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Mobilku API",
  });
});

app.use("/user", user);

module.exports = app