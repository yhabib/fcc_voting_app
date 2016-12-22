let express = require('express'),
    passport = require('passport'),
    router = express.Router();


router
    .route('/')
    .get(passport.authenticate('twitter'));

router
    .route('/return')
    .get(passport.authenticate('twitter', { failureRedirect: '/login/twitter'}),
        (req, res) => res.redirect('/') 
    );

module.exports = router;