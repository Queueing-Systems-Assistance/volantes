const logger = require('../../../config/LoggingConfig')(__filename)

const ENVIRONMENT_PROD = 'prod'
const BRANCH_NAME_FEATURE = 'feature'
const ERROR_PROD_DEPLOYMENT = 'Validation error, production environment with feature build not supported!'

const isProductionDeployment = environment => environment === ENVIRONMENT_PROD
const isFeatureBranchBuild = version => version.toLowerCase().includes(BRANCH_NAME_FEATURE)

module.exports = {
	/**
	 * Validates prod deployment.
	 * @param {DeployContext} context context
	 * @returns {boolean} true if the version presents, false otherwise
	 */
	isValid(context) {
		const environment = context.environment
		const version = context.version
		let isValid = true
		if (isProductionDeployment(environment)) {
			isValid = !isFeatureBranchBuild(version)
		}
		if (!isValid) {
			logger.warn(ERROR_PROD_DEPLOYMENT)
		}
		return isValid
	}
}
