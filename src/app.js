const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const app = express();

app.use(bodyParser.json());

require('dotenv').config();

//connect to mongodb
require("./dbs/mongo");

// set router
app.use(require("./routers/index"));

module.exports = app;