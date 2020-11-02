const Discord = require('discord.js')
const logger = require('./LoggingConfig')(__filename)

const APPLICATION_STARTING = 'Starting Volantes application'
const APPLICATION_SUCCESSFULLY_STARTED = 'Volantes successfully started, profile: {0}!'
const FAILED_TO_LOGIN_ERROR = 'Error occurred while logging in'
const EVENT_READY = 'ready'

const discordConfig = {
	setUp: () => {
		logger.info(APPLICATION_STARTING)
		const client = new Discord.Client()

		client.login(process.env.DISCORD_TOKEN).catch((error) => logger.error(FAILED_TO_LOGIN_ERROR, error))
		client.once(EVENT_READY, () => logger.info(APPLICATION_SUCCESSFULLY_STARTED.format(process.env.APP_PROFILE)))
	}
}

module.exports = discordConfig
