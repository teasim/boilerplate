import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { fetchMiddleware } from 'teasim-middleware-fetch'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from 'app/reducers/index'
import thunkMiddleware from 'redux-thunk'

export default function generateStore (baseHistory, initialState) {
  const loggingMiddleware = createLogger()
  const routingMiddleware = routerMiddleware(baseHistory)

  const middlewares = applyMiddleware(
    thunkMiddleware,
    fetchMiddleware,
    routingMiddleware,
    loggingMiddleware
  )

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middlewares)
  )

  const history = baseHistory

  return { store, history }
}
