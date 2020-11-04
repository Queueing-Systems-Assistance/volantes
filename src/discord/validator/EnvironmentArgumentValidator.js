const COMMA_DELIMITER = ','
const ENVIRONMENTS = process.env.DEPLOY_ENVIRONMENTS.split(COMMA_DELIMITER)
const ARGUMENT_NAME_ENVIRONMENT = 'environment'

module.exports = {
	/**
	 * Validates environment argument.
	 * @param {string[]} args message arguments
	 * @returns {boolean} true if the environment is supported, false otherwise
	 */
	validate(args) {
		return ENVIRONMENTS.includes(args[ARGUMENT_NAME_ENVIRONMENT])
	}
}
