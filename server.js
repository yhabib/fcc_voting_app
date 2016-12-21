/********************************************************************************
    -- PACKAGES --
********************************************************************************/

let express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session');


/********************************************************************************
    -- ROUTES --
********************************************************************************/

let home = require('./routes/home'),
    newPoll = require('./routes/new-poll'),
    myPolls = require('./routes/my-polls'),
    poll = require('./routes/poll');

/********************************************************************************
    -- INIT --
********************************************************************************/

let mongo = mongodb.MongoClient,
    url = `mongodb://${process.env.MONGO_USER_PSW}@ds129018.mlab.com:29018/fcc_voting_app`,
    schema = require('./schema'),
    passport = require('passport'),
    strategy = require('passport-twitter').Strategy;  



/********************************************************************************
    -- APP --
********************************************************************************/

mongoose.Promise = global.Promise;
mongoose.connect(url, (err, db) => {
    if(err) throw err;
    else console.log( 'Success: Connected to DB' );
});


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser((user, cb) =>  cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(new strategy({
    consumerKey: process.env.VOTING_APP_CONSUMER_KEY,
    consumerSecret: process.env.VOTING_APP_CONSUMER_SECRET,
    callbackURL: 'https://yhabib-voting-app.herokuapp.com/auth/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

let app = express();

app
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
    .use('/auth/twitter', passport.authenticate('twitter'))
    .use('/auth/twitter/return',
        passport.authenticate('twitter', { failureRedirect: '/auth/twitter' }),
        (req, res) => res.redirect('/')
    );

module.exports = app;