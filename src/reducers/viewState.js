const R = require('ramda')
const constants = require('../constants')
const util = require('../util')

const setViewState = R.set(R.lensProp('viewState'))

module.exports = util.setupReducer({})
	.on(constants.SET_VIEW_STATE, function (action, oldState) {
		const viewState = R.defaultTo({}, oldState.viewState)
		const viewCategory = R.defaultTo({}, viewState[action.category])
		const viewItem = R.defaultTo({}, viewCategory[action.id])

		const newState = R.pipe(
			R.set(
				R.lensProp(action.property),
				R.__,
				viewItem
			),
			R.set(
				R.lensProp(action.id),
				R.__,
				viewCategory
			),
			R.set(
				R.lensProp(action.category),
				R.__,
				viewState
			)
		)(action.value)

		console.log(newState)

		return setViewState(newState)
	})
	.on(constants.CLEAR_VIEW_STATE, function (action, oldState) {
		if (!action.category) return setViewState({})

		const viewState = R.defaultTo({}, oldState.viewState)

		const newState = R.set(
			R.lensProp(action.category),
			{},
			viewState
		)

		return setViewState(newState)
	})
	.create()
