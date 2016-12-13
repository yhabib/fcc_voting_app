let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();


// This view only needs the title of the poll
router
    .route('/')
    .get((req, res) => {
        let rules = {
                creator: "Admin"
            },
            projection = {
                _id: 0,
                name: 1
            };
        
        interface.getPolls(rules, projection, (err, docs) => {            
            if(err) throw err;
            else
                res.render('my-polls', {polls: docs, user: {name: "Yusef"}});
        });
    });

module.exports = router;