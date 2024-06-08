const mongoose = require("mongoose");

class Mongo {
  constructor() {
    this._connect();
  }
  _connect() {
    const env = process.env.NODE_ENV;
    let URL = '';
    if (env === 'dev') {
      URL = process.env.MONGO_URL_DEV;
    } else if (env === 'staging') {
      URL = process.env.MONGO_URL_STAGING;
    } else {
      URL = process.env.MONGO_URL_PROD;
    }
    console.log("DB URL: ", URL);
    mongoose
      .connect(URL).then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
        console.error(err);
      })  
  } 
}

module.exports = new Mongo();