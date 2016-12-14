let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();

router
    .route('/:id')
    .get((req, res) => {
        let filter = {
                _id: req.params.id
            };
            console.log(filter);
            

        interface.getPollById(filter, (err, doc) => {
            if(err) throw err;
            console.log(doc);
            res.render('poll', {poll: doc, user: {name: "Yusef"}});
        });
        
        
    });

module.exports = router;