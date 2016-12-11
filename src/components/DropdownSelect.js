const m = require('mithril')
const store = require('../store')

const actions = {

}

// args.dropdownLabel: String
// args.options: []
function DropdownSelect (ctrl, args) {
	return m('div.dropdown', {
		onclick: function (e) {
			e.stopPropagation()
		}
	}, [
		m('button.btn.dropdown-toggle.' + (args.buttonClass || 'btn-primary'), {

		}, [
			args.dropdownLabel
			m('span.caret')
		]),
		m('ul.dropdown-menu', args.options.map(function () {

		}))
	})
}

module.exports = {view: Dropdown}
