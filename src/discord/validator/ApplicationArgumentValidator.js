const COMMA_DELIMITER = ','
const APPLICATIONS = process.env.DEPLOY_APPLICATIONS.split(COMMA_DELIMITER)
const ARGUMENT_NAME_APPLICATION = 'application'

module.exports = {
	validate(args) {
		return APPLICATIONS.includes(args[ARGUMENT_NAME_APPLICATION])
	}
}
