const winston = require('winston')
const path = require('path')
const { LogstashTransport } = require('winston-logstash-transport')

const LOG_FILE_NAME = 'volantes.log'
const LOG_DIRECTORY_NAME = 'logs'
const COMMA_DELIMITER = ','
const EMPTY_SPACE_ALIGN = ' '
const NUMBER_OF_EMPTY_SPACE = 5
const EXCEPTION_FORMAT = '\n{0}'
const EMPTY_TEXT = ''
const LINE_FORMAT = '{0} {1} {2} - {3} {4}'

const LOGGING_CONFIG_MIN_LEVEL = process.env.LOGGING_CONFIG_MIN_LEVEL || 'debug'
const LOGGING_FORMAT = process.env.LOGGING_FORMAT || 'json'
const LOGGING_TRANSPORT = process.env.LOGGING_TRANSPORT || 'console'
const RELEASE_VERSION = process.env.RELEASE_VERSION

const FORMATTER = winston.format
const formatCaller = (callerFileName) => path.basename(callerFileName)
const formatLevel = (level) => level.toUpperCase().padEnd(NUMBER_OF_EMPTY_SPACE, EMPTY_SPACE_ALIGN)

const formatStackTrace = (exception) => (exception ? EXCEPTION_FORMAT.format(exception.stack) : EMPTY_TEXT)

const lineFormat = FORMATTER.printf((log) => {
	const formattedLevel = formatLevel(log.level)
	const formattedStack = formatStackTrace(log.exception)
	return LINE_FORMAT.format(log.timestamp, formattedLevel, log.caller, log.message, formattedStack)
})
const jsonFormat = FORMATTER.printf((info) => JSON.stringify({
	timestamp: info.timestamp,
	level: formatLevel(info.level),
	application: process.env.APP_NAME,
	caller: formatCaller(info.caller),
	buildVersion: RELEASE_VERSION,
	message: info.message,
	stackTrace: formatStackTrace(info.stack)
}))

const logstashTransport = new LogstashTransport({ host: process.env.LOGGING_HOST, port: process.env.LOGGING_PORT })

const fileTransport = new winston.transports.File({
	dirname: LOG_DIRECTORY_NAME,
	filename: LOG_FILE_NAME
})
const consoleTransport = new winston.transports.Console()

const formatters = {
	line: lineFormat,
	json: jsonFormat
}

const transports = {
	console: consoleTransport,
	file: fileTransport,
	logstash: logstashTransport
}

const logger = winston.createLogger({
	level: LOGGING_CONFIG_MIN_LEVEL,
	exitOnError: false,
	handleExceptions: true,
	format: FORMATTER.combine(
		FORMATTER.errors({ stack: true }),
		FORMATTER.timestamp(),
		formatters[LOGGING_FORMAT]
	),
	transports: LOGGING_TRANSPORT.split(COMMA_DELIMITER).map(transport => transports[transport])
})

module.exports = (filename) => ({
	/**
	 * Log with DEBUG level.
	 * @param {string} message Log message
	 */
	debug(message) {
		logger.debug(message, { caller: formatCaller(filename) })
	},
	/**
	 * Log with INFO level.
	 * @param {string} message Log message
	 */
	info(message) {
		logger.info(message, { caller: formatCaller(filename) })
	},
	/**
	 * Log with WARN level.
	 * @param {string} message Log message
	 */
	warn(message) {
		logger.warn(message, { caller: formatCaller(filename) })
	},
	/**
	 * Log with ERROR level.
	 * @param {string} message Log message
	 * @param {Error} exception error object
	 */
	error(message, exception) {
		logger.error(message, { caller: formatCaller(filename), exception })
	}
})
