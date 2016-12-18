let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();

// Check if the user already voted,
// if not increase it and then

router
    .route('/:id')
    .post((req, res) => {
        const id = req.params.id,
              user = "as",
              value = req.body.value;

        // If the user already voted -> nothign to do here
        interface.findOneAndUpdate(id, user, value, (err, doc) => {
            if(err) throw err;
            if(doc) {
                const count = [],
                      labels = [];
                
                doc.options.forEach(option => {
                    count.push(option.count);
                    labels.push(option.value);
                });
                           
                res.render('poll', {poll: doc, count: count, labels: labels, date: doc.createdTime.toDateString(), user: {name: "Yusef"}});
            }
            else
                interface.getPollById(id, (err, doc) => {
                    if(err) throw err;

                    const count = [],
                          labels = [];
                
                    doc.options.forEach(option => {
                        count.push(option.count);
                        labels.push(option.value);
                    });

                    res.render('poll', {poll: doc, count: count, labels: labels, date: doc.createdTime.toDateString(), user: {name: "Yusef"}});
                });
        });
    });

module.exports = router;