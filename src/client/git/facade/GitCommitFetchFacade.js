const GitHubGateway = require('../gateway/GitHubGateway')
const GitCommitHashResolver = require('../resolver/GitCommitHashResolver')
const GitResponseAssembler = require('../assembler/GitResponseAssembler')

module.exports = {
	/**
	 * Facade for processing git fetch requests.
	 * @param {DeployContext} context context
	 * @returns {GitResponse} assembled response
	 */
	async process(context) {
		const gitHubHashResponse = await GitHubGateway.getCommitHash(context)
		const commitHash = GitCommitHashResolver.resolve(gitHubHashResponse)
		const gitHubCommitResponse = await GitHubGateway.getCommitMessage(context.application, commitHash)
		return GitResponseAssembler.assemble(gitHubCommitResponse)
	}
}
