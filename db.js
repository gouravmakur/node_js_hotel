const mongoose = require('mongoose');

// Correcting the connection string to remove any leading/trailing spaces
const mongoURL = 'mongodb://127.0.0.1:27017/students';

// Setup MongoDB connection
mongoose.connect(mongoURL);

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
