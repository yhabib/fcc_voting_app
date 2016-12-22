/********************************************************************************
    -- PACKAGES --
********************************************************************************/

let express = require('express'),
    pug = require('pug'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session');


/********************************************************************************
    -- ROUTES --
********************************************************************************/

let home = require('./routes/home'),
    newPoll = require('./routes/new-poll'),
    myPolls = require('./routes/my-polls'),
    poll = require('./routes/poll'),
    auth = require('./routes/auth');

/********************************************************************************
    -- INIT -- Database and authentication
********************************************************************************/

let config = require('./config'),
    passport = require('passport');


/********************************************************************************
    -- APP --
********************************************************************************/

let app = express()
    // Configure view engine to render PUG templates.
    .set('views', path.join(__dirname, 'public/views'))
    .set('view engine', 'pug')
    // Use application-level middleware for common functionality, including logging, parsing, and session handling.
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Initialize Passport and restore authentication state, if any, from the session.
    .use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
    .use(passport.initialize())
    .use(passport.session())
    // Routes
    .use('/', home)
    .use('/new-poll', newPoll)
    .use('/my-polls', myPolls)
    .use('/poll', poll)
    .use('/login/twitter', auth);

module.exports = app;