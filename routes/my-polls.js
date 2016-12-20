let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();


// This view only needs the title of the poll and the _id in case it clicks
router
    .route('/')
    .get((req, res) => {
        let rules = {
                creator: "Yusef"
            },
            projection = { name: 1 };
        
        interface.getPolls(rules, projection, (err, docs) => {                        
            if(err) throw err;
            else
                res.render('my-polls', {polls: docs, user: {name: "Yusef"}, route:"my-polls"});
        });
    })
    .post((req, res) => {
        const id = req.body.id;
        
        // Delete post with id
        interface.findOneAndRemove(id, (err, docs) => {                        
            if(err) throw err;
            else res.redirect('./');
        });
    });

module.exports = router;