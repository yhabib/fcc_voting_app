let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    pollName: {
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
    pollOptions: [
        {
             value: { 
                type:String,
                required: true
             },
             voteCount: {
                 type: Number,
                 required: true
             }
        }
    ],
    voters: [ { user: String } ]
});