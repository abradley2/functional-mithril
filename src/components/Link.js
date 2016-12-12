const m = require('mithril')
const R = require('ramda')
const store = require('../store')
const constants = require('../constants')

function Link (ctrl, args, children) {
	return m('a' + (args.className || ''), R.merge({
		config: function () {
			if (args.href.indexOf('javascript:void(0)') === -1) return
			store.dispatchAction({
				type: constants.ROUTE,
				href: args.href,
				replace: args.replace || false
			})
		}
	}, args), args.innerText || children)
}

module.exports = {view: Link}
