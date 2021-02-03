const ApplicationContextValidator = require('./ApplicationContextValidator')
const EnvironmentContextValidator = require('./EnvironmentContextValidator')
const VersionContextValidator = require('./VersionContextValidator')
const ProdDeploymentContextValidator = require('./ProdDeploymentContextValidator')

const validators = [
	ApplicationContextValidator,
	EnvironmentContextValidator,
	VersionContextValidator,
	ProdDeploymentContextValidator
]

module.exports = {
	/**
	 * Validates context.
	 * @param {DeployContext} context context
	 * @returns {boolean} true if context built correctly, false otherwise
	 */
	isValid(context) {
		return !validators.map(validator => validator.isValid(context)).includes(false)
	}
}
