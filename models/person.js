const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    salary: {
        type: Number,
        required: true
    },
    username :{
        required:true,
        type: String
    },
    password :{
        required : true,
        type: String
    }
});

Person = mongoose.model('Person',personSchema);
module.exports = Person;