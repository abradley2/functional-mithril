const m = require('mithril')
const R = require('ramda')
const store = require('./store')

const TodoList = require('./components/TodoList')

const TodoListView = {
	controller: function () {

	},
	view: TodoList
}

document.addEventListener('DOMContentLoaded', function () {

	const appContainer = document.createElement('div')

	document.body.appendChild(appContainer)

	m.route.mode = 'pathname'

	m.route(appContainer, '/', {
		'/': TodoListView,
		'/:filter': TodoListView
	})

})
