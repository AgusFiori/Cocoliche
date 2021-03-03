const initialState = {
  allProducts: []
}

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':

      return {
        ...state,
        allProducts: action.payload
      }
    case 'RERENDER':
      return {
        ...state,
        allProducts: state.allProducts.map(product => product._id === action.payload._id ? action.payload : product)
      }
    default:
      return state
  }
}

