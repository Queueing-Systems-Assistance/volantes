const UNDEFINED_TEXT = 'undefined'
const ARGUMENT_PLACEHOLDER_REGEXP = /{(\d+)}/g

const insertArgument = (args, number, match) => typeof args[number] !== UNDEFINED_TEXT ? args[number] : match

module.exports = {
	/**
	 * Formatting configuration.
	 */
	config() {
		if (!String.prototype.format) {
			String.prototype.format = function() {
				return this.replace(ARGUMENT_PLACEHOLDER_REGEXP, (match, number) => insertArgument(arguments, number, match))
			}
		}
	}
}
