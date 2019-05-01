import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import auth from './auth'
import alert from './alert'

export default createStore(
  combineReducers({
    auth,
    alert
  }),
  applyMiddleware(thunk)
)
