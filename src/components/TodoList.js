const m = require('mithril')
const store = require('../store')
const constants = require('../constants')

const actions = {
	editMessage: function (message) {
		store.dispatchAction({
			type: constants.EDIT_MESSAGE,
			message: message
		})
	}
}

function TodoList (ctrl, args) {
	const state = store.getState()
	const filter = m.route.param('filter')

	return m('div.container', [
		m('input.form-control', {
			value: state.message || '',
			oninput: m.withAttr('value', actions.editMessage)
		}),
		m('h3', state.message)
	])
}

module.exports = {view: TodoList}
