## concepts
`elo-discord` is a self-hosted discord bot controller, with the intention of being modular.

## requirements
- `node v12` / `nvm`
- `npm` / `yarn`

## installation
1. `git clone https://github.com/Elocast/elo-discord.git`
2. `nvm use v12` (optional)
3. Configure env variables (look below)
4. `yarn install` / `npm install`
5. `yarn start` / `npm install`

TIP: if you're using linux, you can run the app with [pm2](https://github.com/Unitech/pm2) in order to have it monitored and run in the background. If you're not worried for the downtime, a simple `screen` session should do the job just well.

## configuration
`elo-discord` config is based on environmental variables, for which we use `dotenv` package; you'll have to create a `.env` file, in the root directory with required env variables. Use `.env-example` file as a guide, to what variables you have to configure. Naturally, if you're using docker, you'll specify environment variables through docker cli.

### variables
`BOT_TOKEN` is an OAuth2 access token you'll be using to take control over the bot.
`ELOCAST_API_URL` shouldn't be changed, unless you know what you're doing.

`ADDON_STREAM_CHANNEL_ID` is a channel you wish the bot to publish notifications at. Make sure you've allowed your bot to access and interact with given channel.
`ADDON_STREAM_LOOP_TIME` specifies how often (in miliseconds) the bot should check for stream updates. Don't go below 10 seconds, or our proxy will rate-limit your requests.
`ADDON_STREAM_ELOCAST_SEO` is seo of the channel you wish to keep track of. `https://elocast.com/<SEO>`
`ADDON_STREAM_USER_ID` is a user that will be tagged, in notifications/messages.

`ADDON_STREAM_NOTIFY_*` variables are converted to boolean by default, hence return `false` if not configured.

## discord
Elocast doesn't supply a discord bot itself, you'll have to create one yourself. To do that, visit `https://discord.com/developers/applications` and create a new application. After that, head over to `<app_name>/bot` tab and click `Add Bot` button. Assuming nothing went wrong, you'll be redirected to your bot's page. You can configure the bot to your liking, but what's actually important right now, is the `token`, which can be found below the `username` input. Save it to your `.env` file, as `BOT_TOKEN` variable. Afterwards, head over to `<app_name>/OAuth2` tab, under `scopes` you'll select option `bot` and copy the URL from the input below. Paste the url in your browser and select the server you wish to authorise the bot at.

Now, unless you've already specified them you'll be left with two, missing env variables:
- [`ADDON_STREAM_CHANNEL_ID`] Create a `text channel` on your server, or use an existing one. Right click the channel and select `Copy ID`.
- [`ADDON_STREAM_USER_ID`] Find a user you wish to be tagged in notifications, and right click on ther avatar/username. Select `Copy ID` option.
