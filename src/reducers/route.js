const R = require('ramda')
const m = require('mithril')
const constants = require('../constants')
const setupReducer = require('../util').setupReducer

const setRoute = R.set(R.lensProp('route'))

module.exports = setupReducer()
	.on(constants.ROUTE, function (action, oldState) {

		m.route(action.href, action.replace || false)

		return setRoute(action.href)
	})
	.create()
