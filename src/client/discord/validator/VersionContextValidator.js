const logger = require('../../../config/LoggingConfig')(__filename)

const ERROR_VERSION_NULL = 'Validation error, version not present [{0}]'

module.exports = {
	/**
	 * Validates the version attribute of the context.
	 * @param {DeployContext} context context
	 * @returns {boolean} true if the version presents, false otherwise
	 */
	isValid(context) {
		const isValid = !!context.version
		if (!isValid) {
			logger.warn(ERROR_VERSION_NULL.format(context.version))
		}
		return isValid
	}
}
