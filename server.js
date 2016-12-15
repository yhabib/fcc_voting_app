const MONGOUSERPSW = process.env.MONGO_USER_PSW;


/********************************************************************************
    -- PACKAGES --
********************************************************************************/

let express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');


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
    url = `mongodb://${MONGOUSERPSW}@ds129018.mlab.com:29018/fcc_voting_app`,
    schema = require('./schema'),
    app = express();     



/********************************************************************************
    -- APP --
********************************************************************************/
mongoose.Promise = global.Promise;
mongoose.connect(url, (err, db) => {
    if(err) throw err;
    else console.log( 'Success: Connected to DB' );
});

app.use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/', home)
    .use('/new-poll', newPoll)
    .use('/my-polls', myPolls)
    .use('/poll', poll)
    .set('views', path.join(__dirname, 'public/views'))
    .set('view engine', 'pug');

module.exports = app;