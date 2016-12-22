let express = require('express'),
    passport = require('passport'),
    router = express.Router();


router
    .route('/login/twitter')
    .get(passport.authenticate('twitter'));

router
    .route('/login/twitter/return')
    .get(passport.authenticate('twitter', { failureRedirect: '/login/twitter' }),
    (req, res) => res.redirect('/'));

router
    .route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/')
    });

module.exports = router;