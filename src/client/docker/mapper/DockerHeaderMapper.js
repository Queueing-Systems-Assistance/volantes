const PASSWORD = process.env.GITHUB_DOCKER_TOKEN
const USERNAME = process.env.GITHUB_DOCKER_USERNAME
const DOCKER_REGISTRY = process.env.DOCKER_REGISTRY
const CONTENT_TYPE_APPLICATION_JSON = 'application/json'
const ENCODING_TYPE = 'base64'

module.exports = {
	/**
	 * Maps default headers for docker api.
	 * @returns {object} default header
	 */
	mapDefaultHeaders() {
		return {
			'Content-Type': CONTENT_TYPE_APPLICATION_JSON
		}
	},
	/**
	 * Maps authentication headers for docker api.
	 * @returns {object} authentication header
	 */
	mapAuthHeaders() {
		return {
			'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
			'X-Registry-Auth': Buffer.from(JSON.stringify({
				username: USERNAME,
				password: PASSWORD,
				serveraddress: DOCKER_REGISTRY
			})).toString(ENCODING_TYPE)
		}
	}
}
