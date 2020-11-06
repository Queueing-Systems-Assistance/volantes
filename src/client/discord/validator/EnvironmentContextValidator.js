const logger = require('../../../config/LoggingConfig')(__filename)

const COMMA_DELIMITER = ','
const ENVIRONMENTS = process.env.DEPLOY_ENVIRONMENTS.split(COMMA_DELIMITER)
const ERROR_ENVIRONMENT_NOT_SUPPORTED = 'Validation error, environment is not supported [{0}]'

module.exports = {
	/**
	 * Validates the environment attribute of the context.
	 * @param {DeployContext} context context
	 * @returns {boolean} true if the environment is supported, false otherwise
	 */
	isValid(context) {
		const isValid = ENVIRONMENTS.includes(context.environment)
		if (!isValid) {
			logger.warn(ERROR_ENVIRONMENT_NOT_SUPPORTED.format(context.environment))
		}
		return isValid
	}
}
