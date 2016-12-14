let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();


router
    .route('/')
    .get((req, res) => {
        res.render('new-poll', {user: {name: "Yusef"}, route: "new-poll"});
    })
    .post((req, res) => {
        let title = req.body.title,
            options = [], 
            creator = req.body.creator;
        
        Object.keys(req.body).forEach(k => {
            if(k.toLowerCase().indexOf('option') > -1) 
                options.push(req.body[k]);
        });

        // Get name of the creator:
    

        interface.insertPoll({name: title, options: options, creator: creator}, err => {
            if(err) throw err;
            else res.json("New Poll inserted into the DB");
        });   
    });




module.exports = router;