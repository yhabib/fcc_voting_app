let express = require('express'),
    connectEnsureLogin = require('connect-ensure-login'),
    interface = require('./../model.interface'),
    router = express.Router();


// This view only needs the title of the poll and the _id in case it clicks
router
    .route('/')
    .get(connectEnsureLogin.ensureLoggedIn('/login/twitter'), 
        (req, res) => {
            let session = req.session.passport,
                rules = {
                    creator: session.user.userName
                },
                projection = { name: 1 };
            
            interface.getPolls(rules, projection, (err, docs) => {                        
                if(err) throw err;
                else
                    res.render('my-polls', {polls: docs, user: session, route:"my-polls"});
            });
        })
    .post(connectEnsureLogin.ensureLoggedIn(),
        (req, res) => {
            const id = req.body.id;
            
            // Delete post with id
            interface.findOneAndRemove(id, (err, docs) => {                        
                if(err) throw err;
                else res.redirect('./');
            });
    });

module.exports = router;