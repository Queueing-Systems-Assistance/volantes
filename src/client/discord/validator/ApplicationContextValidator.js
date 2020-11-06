const logger = require('../../../config/LoggingConfig')(__filename)

const COMMA_DELIMITER = ','
const APPLICATIONS = process.env.DEPLOY_APPLICATIONS.split(COMMA_DELIMITER)
const ERROR_APPLICATION_NOT_SUPPORTED = 'Validation error, application is not supported [{0}]'

module.exports = {
	/**
	 * Validates the application attribute of the context.
	 * @param {DeployContext} context context
	 * @returns {boolean} true if the application is supported, false otherwise
	 */
	isValid(context) {
		const isValid = APPLICATIONS.includes(context.application)
		if (!isValid) {
			logger.warn(ERROR_APPLICATION_NOT_SUPPORTED.format(context.application))
		}
		return isValid
	}
}
