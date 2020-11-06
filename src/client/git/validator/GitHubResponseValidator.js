const ERROR_MULTIPLE_VERSIONS_FOUND = 'Multiple application versions found [{0}]'
const ERROR_NO_VERSIONS_FOUND = 'No application versions found'
const ERROR_MULTIPLE_PULL_REQUESTS_FOUND = 'Multiple pull request found [{0}]'

module.exports = {
	/**
	 * Validates response from GitHub commit hash fetch.
	 * @param {GitHubResponse} response from fetch
	 */
	validateCommitHashResponse(response) {
		const errors = response.errors
		if (errors) {
			throw errors.pop().message
		}
		const totalCountOfVersions = response.data.repository.refs.totalCount
		if (totalCountOfVersions > 1) {
			throw ERROR_MULTIPLE_VERSIONS_FOUND.format(totalCountOfVersions)
		}
		if (totalCountOfVersions === 0) {
			throw ERROR_NO_VERSIONS_FOUND
		}
	},
	/**
	 * Validates response from GitHub commit message fetch.
	 * @param {GitHubResponse} response from fetch
	 */
	validateCommitMessageResponse(response) {
		const errors = response.errors
		if (errors) {
			throw errors.pop().message
		}
		const totalCountOfPullRequests = response.data.repository.object.associatedPullRequests.totalCount
		if (totalCountOfPullRequests > 1) {
			throw ERROR_MULTIPLE_PULL_REQUESTS_FOUND.format(totalCountOfPullRequests)
		}
	}
}
