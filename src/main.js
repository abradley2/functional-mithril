const m = require('mithril')
const R = require('ramda')

const TodoList = require('./components/TodoList')

function todoRoute () {
	console.log('todos')
	return {view: TodoList}
}

console.log('DOIN IT')

document.addEventListener('DOMContentLoaded', function () {

	m.route.mode = 'pathname'

	m.route(document.body, '/', {
		'': todoRoute,
		'/:filter': todoRoute
	})

})
