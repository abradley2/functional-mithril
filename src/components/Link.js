const m = require('mithril')
const R = require('ramda')
const store = require('../store')
const constants = require('../constants')

const actions = {
	route: function (href, replace) {
		store.dispatchAction({
			type: constants.ROUTE,
			href: href,
			replace: replace
		})
	},
	clearViewState: function () {
		store.dispatchAction({
			type: constants.CLEAR_VIEW_STATE
		})
	}
}

function Link (ctrl, args, children) {
	return m('a' + (args.className || ''), R.merge({
		href: args.route || location.pathname,
		config: function (el) {
			el.onclick = function (e) {
				e.preventDefault()

				args.onclick.call(args, e)

				if (!args.href) {
					return
				}

				actions.route(args.href, args.replaceState || false)

				if (args.clearViewState !== false) {
					actions.clearViewState()
				}

			}
		}
	}, args), args.innerText || children)
}

module.exports = {view: Link}
