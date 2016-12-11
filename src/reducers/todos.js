const R = require('ramda')
const constants = require('../constants')
const util = require('../util')

const initialState = {}

const setTodos = R.set(R.lensProp('todos'))

const setMessage = R.set(R.lensProp('message'))

module.exports = util.setupReducer(initialState)
	.on(constants.EDIT_MESSAGE, function (action, oldState) {
		return setMessage(action.message)
	})
	.on(constants.ADD_TODO, function (action, oldState) {
		return oldState
	})
	.on(constants.EDIT_TODO, function (action, oldState) {
		return oldState
	})
	.on(constants.TOGGLE_TODO_COMPLETED, function (action, oldState) {
		return oldState
	})
	.on(constants.REMOVE_TODO, function (action, oldState) {
		return oldState
	})
	.create()
