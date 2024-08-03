const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
  tls: true,
  tlsAllowInvalidCertificates: true, // Only for testing, remove in production
});

const db = mongoose.connection;

// Event Listeners
db.on('connected', () => {
    console.log("Connected to MongoDB Server");
});

db.on('error', (err) => {
    console.error("Error! Couldn't connect to the server:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB server disconnected");
});

module.exports = db;