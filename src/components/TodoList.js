const m = require('mithril')
const store = require('../store')
const constants = require('../constants')

module.exports = function () {
	const state = store.getState()
	const filter = m.route.param('filter')

	return m('div', [
		m('h3', 'hello world'),
		m('input', {
			value: state.message || '',
			oninput: function (e) {
				store.dispatchAction({
					type: constants.EDIT_MESSAGE,
					message: e.target.value
				})
			}
		})
	])
}
