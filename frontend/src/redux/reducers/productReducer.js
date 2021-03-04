const initialState = {
  allProducts: [],
  allCategories: []
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
    case 'ALL_CATEGORIES':
      return {
        ...state,
        allCategories: action.payload
      }
    default:
      return state
  }
}

