import { Client as DClient } from 'discord.js'

import addons from './addons'

import config from './config'

const client = new DClient()

const StreamBot = new addons.Stream()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)

  StreamBot.init({ dclient: client })
})

client.login(config.BOT_TOKEN)
