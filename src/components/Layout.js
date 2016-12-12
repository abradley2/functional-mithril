const R = require('ramda')
const m = require('mithril')
const constants = require('../constants')
const store = require('../store')

const actions = {
	closeDropdowns: function () {
		const viewState = R.defaultTo({}, store.getState().viewState)
		const dropdowns = R.keys(viewState.dropdownSelects)

		dropdowns.forEach(function (dropdownId) {
			if (viewState.dropdownSelects[dropdownId].open) {
				store.dispatchAction({
					type: constants.SET_VIEW_STATE,
					id: dropdownId,
					category: 'dropdownSelects',
					property: 'open',
					value: false
				})
			}
		})
	}
}

function Layout (ctrl, args, children) {
	if (arguments.length === 2) return Layout(ctrl, {}, args)
	return m('div.container', {
		onclick: actions.closeDropdowns
	}, children)
}

module.exports = {view: Layout}
