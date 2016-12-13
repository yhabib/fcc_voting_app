let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();

// Get all the polls and render them into the page

router
    .route('/')
    .get((req, res) => {
        let obj = {
                name: "Peter",
                creator: "Ad",
                options: [ "a", "b"]
            };

        interface.insertPoll(obj, (err) => {
            if(err) throw err;
            else console.log("inserted");
        });        
        interface.getPolls({}, (err, docs) => {
            if(err) throw err;
            else 
                res.render('index', {polls: docs});
        });
    });

module.exports = router;
