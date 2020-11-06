const GitHubResponseValidator = require('../validator/GitHubResponseValidator')

const PATH_DELIMITER = '/'

const getFirstCommit = gitHubResponse => gitHubResponse.data.repository.refs.nodes.shift()
const resolveHash = gitHubResponse => getFirstCommit(gitHubResponse).target.commitResourcePath

module.exports = {
	/**
	 * Resolves github commit hash.
	 * @param {GitHubResponse} response response from GitHub
	 * @returns {string} commit hash
	 */
	resolve(response) {
		GitHubResponseValidator.validateCommitHashResponse(response)
		return resolveHash(response).split(PATH_DELIMITER).pop()
	}
}
