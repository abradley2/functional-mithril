const m = require('mithril')
const R = require('ramda')
const util = require('./util')
const constants = require('./constants')

const reducers = [

	require('./reducers/view'),
	require('./reducers/todos')

].concat(constants.DEBUG ? [util.recordActions] : [])

const store = m.prop({})

function dispatchAction (action) {
	if (action.constructor === Function) return action(dispatchAction)

	if (!action.type) throw new TypeError('must specify action.type')

	store(R.reduce(
		function (currentState, reduceFunc) {
			const result = reduceFunc(action, currentState)

			if (typeof result === 'undefined' || result === null) {
				throw new TypeError('reducers may not return null or undefined')
			}

			if (result.constructor === Function) {
				return result(currentState)
			}

			return result
		},
		store(),
		reducers
	))
}

if (constants.DEBUG) {
	window.$debug = {
		replayActions: function () {
			dispatchAction(util.replayActions(store))
		},
		getState: function () {
			return store()
		},
		dispatchAction: dispatchAction
	}
}

module.exports = {
	dispatchAction: dispatchAction,
	getState: function () {
		return store()
	}
}
