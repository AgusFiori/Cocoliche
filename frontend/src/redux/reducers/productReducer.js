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
    case 'ADD_SUBCATEGORY':
      return{
        ...state,
        allProducts:action.payload
      }
    case 'MODIFY_SUBCATEGORIES':
      return{
        ...state,
        allProducts: action.payload
      }
    case 'DELETE_SUBCATEGORY':
      console.log("PASO")
      return{
        ...state,
        allProducts: action.payload
      }
    default:
      return state
  }
}

