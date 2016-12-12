const m = require('mithril')
const R = require('ramda')
const store = require('./store')

const TodoList = require('./components/TodoList')

document.addEventListener('DOMContentLoaded', function () {

	const appContainer = document.createElement('div')

	document.body.appendChild(appContainer)

	m.route.mode = 'pathname'

	m.route(appContainer, '/', {
		'/': TodoList,
		'/app/home': TodoList
	})

})
