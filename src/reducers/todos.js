const R = require('ramda')
const constants = require('../constants')
const util = require('../util')

const setTodos = R.set(R.lensProp('todos'))

module.exports = util.setupReducer([])
	.on(constants.ADD_TODO, function (action, oldState) {

	})
	.on(constants.EDIT_TODO, function (action, oldState) {

	})
	.on(constants.TOGGLE_TODO_COMPLETED, function (action, oldState) {

	})
	.on(constants.REMOVE_TODO, function (action, oldState) {
		
	})
	.create()