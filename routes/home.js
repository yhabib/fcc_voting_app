let express = require('express'),
    interface = require('./../model.interface'),
    router = express.Router();

// Get all the polls and render them into the page

router
    .route('/')
    .get((req, res) => {
        let filter = {}, 
        projection = { name: 1, options: 1 };
      
        interface.getPolls(filter, projection, (err, docs) => {            
            if(err) throw err;
            else 
                res.render('index', {polls: docs, user: {}});
        });
    });

module.exports = router;
