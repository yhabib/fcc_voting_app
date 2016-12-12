const MONGOUSERPSW = process.env.MONGO_USER_PSW;

/********************************************************************************
    -- PACKAGES --
********************************************************************************/
let express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    morgan = require('morgan');
    
/********************************************************************************
    -- ROUTES --
********************************************************************************/
let home = require('./routes/home');
/********************************************************************************
    -- INIT --
********************************************************************************/
let mongo = mongodb.MongoClient,
    url = `mongodb://${MONGOUSERPSW}@ds129018.mlab.com:29018/fcc_voting_app`,
    app = express();          

/********************************************************************************
    -- APP --
********************************************************************************/


mongo.connect(url, (err, db) => {
    if(err) 
        throw err;
    else {
        console.log( 'Success: Connected to DB' );
        app.use((req, res, next) => {
            req.db = db;
            next();
        })
        app.use('/', home);
    }
});

app.use(morgan('dev'))
    .use(express.static('public'))
    .set('views', path.join(__dirname, 'public/views'))
    .set('view engine', 'pug');

module.exports = app;