const m = require('mithril')
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
					(handlers || {})
				)
			)
		},
		create: function () {
			return function (action, oldState) {

				if (handlers && handlers[action.type]) {
					return handlers[action.type](action, oldState || initialState)
				}

				return oldState
			}
		}
	}

}

exports.recordActions = function (action, oldState) {
	const prev =
		oldState.__previousActions__ ? oldState.__previousActions__ : []

	if (action.__REPLAY__) return oldState

 	return R.set(
		R.lensProp('__previousActions__'),
		R.append(
			{timeStamp: Date.now(), action: action, state: oldState},
			(prev.length < 200 ? prev : R.drop(1, prev))
		)
	)
}

exports.replayActions = function (store, limit) {
	const recorded = R.defaultTo([], store().__previousActions__)

	const previousActions = R.drop(
		(limit ? (recorded.length - limit) : 0),
		recorded
	)

	if (previousActions.length === 0) return function () {}

	return function (dispatchAction) {

		const promiseChain = previousActions.reduce(function (acc, cur, idx) {
			const deferred = m.deferred()
			const to = (
				idx === 0 ?
				0
				: (cur.timeStamp - previousActions[idx - 1].timeStamp)
			)

			return R.append({
				wait: to < 2000 ? to : 2000,
				deferred: deferred,
				action: cur.action,
			}, acc)
		}, [])

		function resolveChain (asyncs, idx) {
			const i = (typeof idx !== 'undefined') ? idx : 0
			const curAsync = asyncs[i]

			setTimeout(function () {
				curAsync.deferred.resolve(curAsync.action)
			}, curAsync.wait)

			curAsync.deferred.promise.then(function (action) {
				m.startComputation()
				dispatchAction(action)
				m.endComputation()
				if (i !== promiseChain.length - 1) {
					resolveChain(asyncs, i + 1)
				} else {
					store(
						R.set(R.lensProp('__previousActions__'), recorded, store())
					)
				}
			})
		}

		m.startComputation()
		store(previousActions[0].state)
		m.endComputation()

		resolveChain(promiseChain)
	}
}
