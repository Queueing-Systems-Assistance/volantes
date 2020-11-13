const GitCommitMessageResolver = require('../resolver/GitCommitMessageResolver')
const { GitResponse } = require('../../../domain/GitResponse')

module.exports = {
	/**
	 * Assembles a response for later process.
	 * @param {GitHubResponse} response response from GitHub
	 * @returns {GitResponse} assembled response
	 */
	assemble(response) {
		return new GitResponse.Builder()
			.withMessage(GitCommitMessageResolver.resolveCommitMessage(response))
			.withJiraKey(GitCommitMessageResolver.resolveJiraKey(response))
			.build()
	}
}
