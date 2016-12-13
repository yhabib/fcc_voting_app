let mongoose = require('mongoose'),
    schema = require('./schema'),
    Model = mongoose.model('Poll', schema, 'polls');


exports.getPolls = function(rules, callback) {
    Model.find(rules, callback);
};

exports.insertPoll = function(obj, callback) {
    let Poll = new Model({
            name: obj.name,
            creator: obj.creator,
            options: obj.options.map(opt => ({value: opt, count: 0})),
            voters: [] 
        });

    Poll.save(callback);
};