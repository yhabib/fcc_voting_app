let express = require('express'),
    connectEnsureLogin = require('connect-ensure-login'),
    interface = require('./../model.interface'),
    router = express.Router();


router
    .route('/')
    .get(connectEnsureLogin.ensureLoggedIn('/login/twitter'), 
        (req, res) => res.render('new-poll', {user: req.session.passport, route: "new-poll"}))
    .post(connectEnsureLogin.ensureLoggedIn('/login/twitter'), 
        (req, res) => {
            let title = req.body.title,
                options = [], 
                session = req.session.passport  || {};
            
            Object.keys(req.body).forEach(k => {
                if(k.toLowerCase().indexOf('option') > -1) 
                    options.push(req.body[k]);
            });

            interface.insertPoll({name: title, options: options, creator: session.user.userName}, err => {
                if(err) throw err;
                else res.redirect('/');
            });       
    });




module.exports = router;