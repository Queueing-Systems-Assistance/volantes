const logger = require('../../../config/LoggingConfig')(__filename)

const ENVIRONMENT_PROD = 'prod'
const ERROR_CONFIG_PACK_DEPLOYMENT = 'Validation error, config packs can be deploy to production only!'
const CONFIG_PACK_FILTER = 'config-pack'

const isProductionDeployment = environment => environment === ENVIRONMENT_PROD
const isConfigPack = application => String(application).includes(CONFIG_PACK_FILTER)

module.exports = {
	/**
	 * Validates config pack deployment.
	 * @param {DeployContext} context context
	 * @returns {boolean} true the deployment is production, false otherwise
	 */
	isValid(context) {
		const environment = context.environment
		let isValid = true
		if (!isProductionDeployment(environment)) {
			isValid = !isConfigPack(context.application)
		}
		if (!isValid) {
			logger.warn(ERROR_CONFIG_PACK_DEPLOYMENT)
		}
		return isValid
	}
}
