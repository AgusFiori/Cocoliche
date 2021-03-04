import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import { productReducer } from './productReducer'
import eventReducer from './eventReducer'
import cartReducer from './cartReducer'



const reducer = combineReducers({
  eventReducer,
  authReducer,
  cartReducer,
  productR: productReducer,
  eventR: eventReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store