let mongoose = require('mongoose'),
    url = `mongodb://${process.env.MONGO_USER_PSW}@ds129018.mlab.com:29018/fcc_voting_app`,
    passport = require('passport'),
    Strategy = require('passport-twitter').Strategy;


/********************************************************************************
    -- Database --
********************************************************************************/
mongoose.Promise = global.Promise;
mongoose.connect(url, (err, db) => {
    if (err) throw err;
    else console.log('Success: Connected to DB');
});


/********************************************************************************
    -- Authentication --
********************************************************************************/
// Configure Passport authenticated session persistence.

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser((user, done) => {    
    const userInfo = {
        userName: user.username,
        displayName: user.displayName
    };
    done(null, userInfo);
});
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new Strategy({
    consumerKey: process.env.VOTING_APP_CONSUMER_KEY,
    consumerSecret: process.env.VOTING_APP_CONSUMER_SECRET,
    callbackURL: 'https://yhabib-voting-app.herokuapp.com//login/twitter/return'
    // callbackURL: 'http://localhost:3000/login/twitter/return'
},
    function (token, tokenSecret, profile, cb) {
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.

        return cb(null, profile);
    }));
