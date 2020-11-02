require('dotenv').config()
require('./config/FormatterConfig').config()

const logger = require('./config/LoggingConfig')(__filename)
const discordConfig = require('./config/DiscordConfig')

const APPLICATION_STARTING = 'Starting Volantes application'
const APPLICATION_SUCCESSFULLY_STARTED = 'Volantes successfully started, profile: {0}!'

logger.info(APPLICATION_STARTING)

discordConfig.setUp()

logger.info(APPLICATION_SUCCESSFULLY_STARTED.format(process.env.APP_PROFILE))
