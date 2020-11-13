const GitHubResponseValidator = require('../validator/GitHubResponseValidator')

const JIRA_KEY_REGEX = /^QSA-[0-9]+/
const FIRST_PULL_REQUEST = 0
const ERROR_NO_JIRA_KEY_FOUND = 'No JIRA key found, commit message OR pull request title [{0}]'
const ERROR_NO_COMMIT_MESSAGE_FOUND = 'No commit message after JIRA key found, commit message OR pull request title [{0}]'
const MERGE_COMMIT_MESSAGE = 'Merge pull request'

const hasPullRequests = response => response.data.repository.object.associatedPullRequests.totalCount
const isMergeCommit = response => response.data.repository.object.message.includes(MERGE_COMMIT_MESSAGE)
const resolveCommitMessageFromResponse = response => {
	GitHubResponseValidator.validateCommitMessageResponse(response)
	let result = response.data.repository.object.message
	if (hasPullRequests(response) && isMergeCommit(response)) {
		result = response.data.repository.object.associatedPullRequests.nodes[FIRST_PULL_REQUEST].title
	}
	if (!result) {
		throw ERROR_NO_COMMIT_MESSAGE_FOUND
	}
	return result
}

module.exports = {
	/**
	 * Resolves github commit message JIRA key.
	 * @param {GitHubResponse} response response from GitHub
	 * @returns {string} JIRA key
	 */
	resolveJiraKey(response) {
		const commitMessage = resolveCommitMessageFromResponse(response)
		const jiraKey = JIRA_KEY_REGEX.exec(commitMessage)
		if(!jiraKey) {
			throw ERROR_NO_JIRA_KEY_FOUND.format(commitMessage)
		}
		return jiraKey.shift()
	},
	/**
	 * Resolves github commit message without JIRA key.
	 * @param {GitHubResponse} response response from GitHub
	 * @returns {string} commit message
	 */
	resolveCommitMessage(response) {
		const commitMessage = resolveCommitMessageFromResponse(response)
		const message = commitMessage.split(JIRA_KEY_REGEX).pop().trim()
		if (!message) {
			throw ERROR_NO_COMMIT_MESSAGE_FOUND.format(commitMessage)
		}
		return message
	}
}
