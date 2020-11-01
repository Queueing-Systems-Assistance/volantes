const UNDEFINED_TEXT = 'undefined'

module.exports = {
	setUp: () => {
		if (!String.prototype.format) {
			String.prototype.format = function() {
				const args = arguments
				return this.replace(/{(\d+)}/g, function(match, number) {
					return typeof args[number] !== UNDEFINED_TEXT ? args[number] : match
				})
			}
		}
	}
}
