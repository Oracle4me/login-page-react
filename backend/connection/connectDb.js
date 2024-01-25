const mongoose = require('mongoose');

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connect Database')
  } catch (err) {
    console.log(err)
  }
}

module.exports = ConnectDb;