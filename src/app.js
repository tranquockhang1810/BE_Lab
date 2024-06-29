const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const swagger = require('./swagger.js');
const cors = require("cors");

app.use(bodyParser.json());

require('dotenv').config();

//connect to mongodb
require("./dbs/mongo");

// swagger
swagger(app);

// set router
app.use(require("./routes/index"));

app.use(cors());

//Error handler
app.use((err, req, res, next) => {
  const error = err.message ? err.message : err;
  const status = err.status ? err.status : 500;

  return res.status(status).json({
    error: {
      code: status,
      message: error
    }
  });
});

module.exports = app;