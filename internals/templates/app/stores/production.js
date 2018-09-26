import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { fetchMiddleware } from 'teasim-middleware-fetch'
import { rootReducer } from 'app/reducers/index'
import thunkMiddleware from 'redux-thunk'

export default function generateStore (baseHistory, initialState) {
  const routingMiddleware = routerMiddleware(baseHistory)

  const middlewares = applyMiddleware(
    thunkMiddleware,
    fetchMiddleware,
    routingMiddleware
  )

  const store = createStore(
    rootReducer,
    initialState,
    middlewares
  )

  const history = baseHistory

  return { store, history }
}
