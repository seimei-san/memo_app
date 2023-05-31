const mongoose = require("mongoose");


const connectDB = (url) => {
  return mongoose.connect(url)
  .then(() => console.log("connecting to DB"))
  .catch((err) => console.log(err), "at DB connect")
};

module.exports = connectDB;

