const mongoose = require("mongoose");

const dbConnection  = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database Online!')
  } catch (error) {
    console.log(error)
  }
};
module.exports = {
    dbConnection
}