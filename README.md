Free Karma Bot For Slack
============================

#Intro
A lightweight karma bot designed to be integrated easily into slack.
Forked from https://github.com/dbillingham/KarmaSlack
Altered to be runable via your own heroku/mongo instance.

#Setup - APP SIDE

## Code Setup
- Fork this repository
- Run `gulp babel` to generate es5 files (Necessary to run application)
- Push to master

## MongoDB Setup
- As long as its accessible and available anything will do
    + Heroku provides a paid mongodb service
    + Mlab provides a free mongodb service

## Heroku Setup
(Assuming you already have a heroku account / configured)
- `heroku create` in the app directory (Where this Readme is)
- Set necessary heroku configs with `heroku config:set VAR=VALUE`
    + `MONGODB_NAME=[your mongo collection you set up]`
    + `MONGODB_USERNAME=[login username for your mongo instance]`
    + `MONGODB_PASSWORD=[login password for your mongo instance]`
    + `MONGODB_ENDPOINT=[url/endpoint for your mongo instance]`
        * If you used MLab it will look something like:
          `xx####.mlab.com`
    - `NODE_ENV=production`
- `heroku local` to make sure the thing works
- `git push heroku master` to deploy
- `heroku logs` to check and see that your app is running and connected to mongodb

#Setup - SLACK SIDE

##Create new Outgoing WebHook:

    Shortcut: https://<team>.slack.com/services/new/outgoing-webhook
- Go to slack home "https://<team>.slack.com/home"
- Click "Integration"
- Click "Add" on "Outgoing WebHooks"

Click "Add Outgoing WebHooks Integration"

###Fill in the following configuration:
- Channel: Any
- Trigger Word: karma
- Url: http://warm-sea-8289.herokuapp.com/karma
- Token: (Leave as default)(copy this as you will need it later)
- Descriptive Label: (Leave as default)
- Customize Name: karma
- Customize Icon: (choose cat icon)
- Click "Save Settings"

    ![Outgoing WebHook Config](http://warm-sea-8289.herokuapp.com/instructions/outgoingWebHooksConfig.JPG)

##Create new Incoming WebHook:

    Shortcut: https://<team>.slack.com/services/new/incoming-webhook
- Go to slack home "https://<team>.slack.com/home"
- Click "Integration"
- Click "Add" on "Incoming WebHooks"

###Fill in the following configuration:
- Post to Channel: #general

- Click "Add Incoming WebHooks Integration"
- Fill in the following configuration:
- Post to Channel: #general
- Webhook URL: (Leave as default)(copy this as you will need it later)
- Descriptive Label: (Leave as default)
- Customize Name: karma
- Customize Icon: (choose cat icon)
- Click "Save Settings"

    ![Incoming WebHook Config](http://warm-sea-8289.herokuapp.com/instructions/incomingWebHooksConfig.JPG)

##Initialising karma:
Within slack, (general channel), run karma init passing the:
- Outgoing WebHook Token
- Incoming WebHook Url

        E.g:
        karma: init {
            "incomingWebhookUrl": "https://hooks.slack.com/services/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",
            "outgoingToken": "25LnEy4vXHEi88Plrpvg6htP"
        }

You should how see a confirmation message, if you dont, then either of these two properties is incorrect.

##Complete:

run "karma: ?" for a full list of karma commands