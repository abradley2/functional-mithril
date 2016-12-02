const m = require('mithril')
const R = require('ramda')

const TodoList = require('./components/TodoList')

document.addEventListener('DOMContentLoaded', function () {

	m.route.mode = 'pathname'

	m.route(document.getElementById('app'), '/', {
		'/': {view: TodoList},
		'/:filter': {view: TodoList}
	})

})
