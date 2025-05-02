
const mongoose = require("mongoose");
const connectDB = async () => {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
};

module.exports = connectDB;
