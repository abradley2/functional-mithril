const R = require('ramda')

const reducers = [
	require('./reducers/view'),
	require('./reducers/todos')
]

const store = m.prop({})

exports.dispatch = function (action) {
	if (!action.type) throw new TypeError('must specify action.type')

	store(R.reduce(
		function (currentState, reduceFunc) {
			const result = reduceFunc(action, currentState)

			return (result === currentState) ? 
				currentState 
				: result(currentState)
		},
		store(),
		reducers
	))
}

exports.getState = function () {
	return store()
}