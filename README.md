# FCC - Voting App

## User Stories:
* As an authenticated user, I can keep my polls and come back later to access them.
* As an authenticated user, I can share my polls with my friends.
* As an authenticated user, I can see the aggregate results of my polls.
* As an authenticated user, I can delete polls that I decide I don't want anymore.
* As an authenticated user, I can create a poll with any number of possible items.
* As an authenticated user, if I don't like the options on a poll, I can create a new option.
* As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

&nbsp;

## Architecture:

1. #### Schema:
    ```javascript 
    {
        pollName: {
            type: String,
            required: true
        },
        creator: {
            type: String,
            required: true
        },
        createdTime: {
            type: Date,
            default: Date.now
        },
        pollOptions: [{
            value: { 
                type:String,
                required: true
             },
             voteCount: {
                 type: Number,
                 required: true
             }
        }],
        voters: [
            { user: String }
        ]
    }
    ```

&nbsp;
2. #### Routes:
    * _/_
        * Shows all polls as a list to un/authenticated users.
        * Links to:
            * Login Page
            * Poll page (authenticated)
            * New Poll Page (authenticated)
    * _new-poll_(authenticated)
        * POST
        * Create a new poll with:
            * Title or question
            * Option 1 and Option 2(required)
            * More options
        * Links to:
            * Home page
            * Poll page (authenticated)
            * My Polls Page (authenticated)
    * _my-polls_(authenticated):
        * Shows all my polls
        * Links to:
            * Home page
            * Poll page (authenticated)
            * New Poll Page (authenticated
    * _poll/${id}_
        * User can vote - POST
        * After it (or as a logged user that has alread voted) user can see results

&nbsp;
3. #### Specifications:
    * Front End:
        * PUG(Jade)
        * Bootstrap3
    * Back End:
        * NodeJS
        * Express
        * Request
        * Multer
    * Testing(Backend:
        * Mocha
        * Supertest
    * Other
        * MongoDB + mLab
        * Heroku
