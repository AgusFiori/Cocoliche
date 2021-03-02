import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  authReducer  from './authReducer'
import  eventReducer  from './eventReducer'
//import  productReducer from './productReducer'


const reducer = combineReducers({
  eventReducer,
  authReducer,
  //productR: productReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store