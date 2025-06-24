const mongoose = require('mongoose');

// const uri = "mongodb+srv://ismail:ismail%4028@cluster0.eap9rhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://ismail:ismail%4028@cluster0.eap9rhi.mongodb.net/Refurbished_mart?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = connectDB;
