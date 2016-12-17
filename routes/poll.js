let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();

// Check if the user already voted,
// if not increase it and then

router
    .route('/:id')
    .post((req, res) => {
        const id = req.params.id,
              user = "rey",
              value = req.body.value;

        // If the user already voted -> nothign to do here
        interface.findOneAndUpdate(id, user, value, (err, doc) => {
            if(err) throw err;
            console.log(doc);
            if(doc)
                res.render('poll', {poll: doc, user: {name: "Yusef"}});
            else {
                // interface.countVote(filter);
                res.end("Nothing")
            }
        });
    });

module.exports = router;