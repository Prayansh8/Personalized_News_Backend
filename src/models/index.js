const mongoose = require("mongoose");
const { User } = require("./user");
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
  const mongoUrl = process.env.DB_URI;

  await mongoose
    .connect(mongoUrl)
    .then(() => console.log("MongoDb Connected!!"))
    .catch((error) => console.log(error));
};

const db = {
  User: User,
};

module.exports = { connect, db };
