const m = require('mithril')

module.exports = function () {
	const filter = m.route.param('filter')

	return m('div', [
		m('h3', 'hello world')
	])
}