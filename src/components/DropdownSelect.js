const m = require('mithril')
const R = require('ramda')
const store = require('../store')
const constants = require('../constants')
const Link = require('./Link')

const actions = {
	openDropdown: function (dropdownId) {
		store.dispatchAction({
			type: constants.SET_VIEW_STATE,
			category: 'dropdownSelects',
			id: dropdownId,
			property: 'open',
			value: true
		})
	},
	select: function (dropdownId, value) {
		store.dispatchAction({
			type: constants.SET_VIEW_STATE,
			category: 'dropdownSelects',
			id: dropdownId,
			property: 'selected',
			value: value
		})
	},
	closeDropdown: function (dropdownId) {
		store.dispatchAction({
			type: constants.SET_VIEW_STATE,
			category: 'dropdownSelects',
			id: dropdownId,
			property: 'open',
			value: false
		})
	}
}

// args.placeholder?: String
// args.id: String
// args.options: [ {href?: String, value?: Any, label: String} ]
function DropdownSelect (ctrl, args) {
	const viewState = R.defaultTo({}, store.getState().viewState)
	const dropdownSelects = R.defaultTo({}, viewState.dropdownSelects)

	const viewModel =
		R.pipe(
			R.merge(args),
			R.merge(dropdownSelects[args.id]),
			R.merge({
				open: false,
				selected: null
			})
		)({})

	const buttonClass = '.btn.dropdown-toggle.' + (args.buttonClass || '.btn-primary')

	// if the dropdown has something selected
	// the dropdownLabel is the selected option's label
	const dropdownLabel =
		R.defaultTo(
			{label: args.placeholder},
			R.find(
				R.whereEq({value: viewModel.selected}),
				args.options
			)
		).label

	const isOpen = viewModel.open ? '.open' : ''

	return m('div.dropdown' + isOpen, {
		onclick: function (e) {
			e.stopPropagation()
		}
	}, [
		m('button' + buttonClass, {
			onclick: actions.openDropdown.bind(actions, args.id)
		}, [
			(args.chooseText ? m('span.small', args.chooseText + ' ') : null),
			dropdownLabel,
			m('span.caret')
		]),
		m('ul.dropdown-menu', args.options.map(function (opt) {
			return m('li', [
				m(Link, {
					style: 'cursor:pointer;',
					href: (opt.href ? opt.href : 'javascript:void(0);'),
					onclick: function () {
						if (args.onSelect) {
							args.onSelect(opt)
						}
						if (opt.value) {
							actions.select(viewModel.id, opt.value)
						}
						actions.closeDropdown(args.id)
					}
				}, opt.label)
			])
		}))
	])
}

module.exports = {view: DropdownSelect}
