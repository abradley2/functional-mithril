const R = require('ramda')

exports.component = function (func) {
	return {view: func}
}

exports.setupReducer = function setupReducer (initialState, handlers) {
	return {
		on: function (actionType, handler) {
			if (!actionType) throw new TypeError('actionType must be valid')

			return setupReducer(
				initialState,
				R.set(
					R.lensProp(actionType), 
					handler,
					R.defaultTo({}, handlers)
				)
			)
		},
		create: function () {
			return function (action, oldState) {
				if (handlers[action]) {
					handlers[action](oldState || initialState)
				}
			}
		}
	}

}