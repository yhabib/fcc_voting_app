let mongoose = require('mongoose'),
    schema = require('./schema'),
    Model = mongoose.model('Poll', schema, 'polls');


exports.getPollById = function(id, callback) {   
    let query = {
        _id: id
    };
    Model.findOne(query, callback);
};

exports.getPolls = function(filter, projection, callback) {    
    Model.find(filter, projection, callback);
};

// Cheks:
    // Does the poll already exist?
    // How can you check that? Exactly name && options && user??
exports.insertPoll = function(obj, callback) {
    let Poll = new Model({
            name: obj.name,
            creator: obj.creator,
            options: obj.options.map(opt => ({value: opt, count: 0})),
            voters: [] 
        });
    
    Poll.save(callback);
};

exports.findOneAndUpdate = function(id, voter, value, callback) {
    const query = {
            _id: id,
            "options.value": value
          },
          update = { $inc: { "options.$.count": 1 }},
          options = { new: true };
    
    // If it is an unlogged user then I have not to insert data about him
    if(!!voter) {
        query.voters = { $nin: [voter] };
        update.$push = { voters: voter };
    }
    
    Model.findOneAndUpdate(query, update, options, callback);
};

exports.findOneAndRemove = function(id, callback) {
    const query = {
            _id: id,
        },
        options = {};
    Model.findOneAndRemove(query, options, callback);
};
