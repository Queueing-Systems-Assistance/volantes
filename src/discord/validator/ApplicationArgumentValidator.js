const COMMA_DELIMITER = ','
const APPLICATIONS = process.env.DEPLOY_APPLICATIONS.split(COMMA_DELIMITER)
const ARGUMENT_NAME_APPLICATION = 'application'

module.exports = {
	/**
	 * Validates application argument.
	 * @param {string[]} args message arguments
	 * @returns {boolean} true if the application is supported, false otherwise
	 */
	validate(args) {
		return APPLICATIONS.includes(args[ARGUMENT_NAME_APPLICATION])
	}
}
