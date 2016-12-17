let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    options: [{
        value: { 
            type:String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }],
    voters: [ String ]
});