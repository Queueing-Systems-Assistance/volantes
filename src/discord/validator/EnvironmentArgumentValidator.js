const COMMA_DELIMITER = ','
const ENVIRONMENTS = process.env.DEPLOY_ENVIRONMENTS.split(COMMA_DELIMITER)
const ARGUMENT_NAME_ENVIRONMENT = 'environment'

module.exports = {
	validate(args) {
		return ENVIRONMENTS.includes(args[ARGUMENT_NAME_ENVIRONMENT])
	}
}
