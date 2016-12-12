const m = require('mithril')
const store = require('../store')
const constants = require('../constants')
const Layout = require('./Layout')
const DropdownSelect = require('./DropdownSelect')

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

	return m(Layout, [
		m('input.form-control', {
			value: state.message || '',
			oninput: m.withAttr('value', actions.editMessage)
		}),
		m('h3', state.message),
		m('hr'),
		m(DropdownSelect, {
			id: 'test-dropdown',
			placeholder: '...',
			chooseText: 'category:',
			options: [
				{label: 'Business', value: 1},
				{label: 'Pleasure', value: 2}
			]
		})
	])
}

module.exports = {view: TodoList}
