const VERSION_MESSAGE = 'v{0}'

module.exports = {
	/**
	 * Resolver Volantes version for Discord footer messages.
	 * @returns {string} readable version text
	 */
	resolve() {
		const version = process.env.RELEASE_VERSION
		return VERSION_MESSAGE.format(version)
	}
}
