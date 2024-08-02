const mongoose = require('mongoose');

const MenuItems = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    taste : {
        type : String,
        enum : ['sweet', 'sour', 'spicy', 'sweet&sour'],
        required : true
    },
    is_drink : {
        type : Boolean,
        default : false
    },
    ingridients : {
        type: [String],
        default : [],
        required : true
    },
    num_sale :{

        type : Number,
        default : 0
    }

});

const MenuItem = mongoose.model('MenuItem',MenuItems);
module.exports = MenuItem;