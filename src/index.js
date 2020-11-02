require('dotenv').config()

const discordConfig = require('./config/DiscordConfig')
const formatterConfig = require('./config/FormatterConfig')

formatterConfig.setUp()
discordConfig.setUp()
