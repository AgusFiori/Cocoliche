const initialState = {
  cart: [],
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      // let prodCart = []
      // prodCart.push(action.payload)
      // const cartLocal = JSON.stringify(prodCart)
      // localStorage.setItem('cart', cartLocal)
      // console.log(localStorage.getItem('cart'))
      // var cartLocal = [JSON.stringify(...state.cart)]
      // var stringifiedCartItem = JSON.stringify(action.payload)
      // cartLocal.push(stringifiedCartItem)
      // localStorage.setItem('cart', cartLocal)
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case 'REMOVE_FROM_CART':
      const stringifiedNewCart = JSON.stringify(action.payload);
      localStorage.setItem('cart', stringifiedNewCart)
      return {
        ...state,
        cart: action.payload
      }
    case 'CLEAR_CART':
      return {
        ...state,
      }
    case 'ADD_FROM_LS':
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state
  }
}

export default cartReducer
