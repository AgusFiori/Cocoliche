import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './authReducer'
import { productReducer } from './productReducer'


const reducer = combineReducers({
  authR: authReducer,
  productR: productReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store