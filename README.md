# FCC - Voting App
As a characteristic this app is being implement with no js client code. The idea here is to focus all the logic of the App in the backend, this is done this way for future comparisions between approaches.

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

1. **Schema:**
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
    voters: [ { user: String } ]
}
```

&nbsp;
2. **Routes:**
* __/__
    * Shows all polls as a list to un/authenticated users.
    * Links to:
        * Login Page
        * Poll page (authenticated)
        * New Poll Page (authenticated)
* __/new-poll__(authenticated)
    * POST
    * Create a new poll with:
        * Title or question
        * Option 1 and Option 2(required)
        * More options
    * Links to:
        * Home page
        * Poll page (authenticated)
        * My Polls Page (authenticated)
* __/my-polls__(authenticated):
    * Shows all my polls
    * Links to:
        * Home page
        * Poll page (authenticated)
        * New Poll Page (authenticated
* __/poll/${id}__
    * User can vote - POST
    * After it (or as a logged user that has alread voted) user can see results

&nbsp;
3. **Specifications:**
There is almost none client js code. The .pug templates have all the logic in order to talk with the Backend without needing a client part.

* Front End:
    * PUG(Jade)
    * Materialize
* Back End:
    * NodeJS
    * Express
    * Passport + Passport Twitter
* Testing(Backend:
    * Mocha
    * Supertest
* Other
    * MongoDB + mLab
    * Heroku
    
---
## To Do's
* Refactoring:
    * Tests
    * Allowing a user to edit his/her poll
    * Every time a user goes to / a db query is performed. Saving the db status?? and updating it when the user creates a new poll
    * Post goes wrong trying to insert into the DB it will hang-forever -> Handle error function? module?
    * Update automatically the polls, if a another user inserts a new poll how does the system recognize it? An update scheduler?
    * What happens if it cannot connect to the DB? How do I treat it?
    * Error pages - 404,...
