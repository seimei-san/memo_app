const express = require("express");
const app = express();
const memoRoute = require("./routes/memos");
const connecgtDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"))

const PORT = 5000;


const start = async () => {
  try {
    await connecgtDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
      app.listen(process.env.PORT || PORT, console.log('Server is started'));
  } catch (err) {
    console.log(err);
  }
};

start();



app.use("/api/v1/memos", memoRoute)

