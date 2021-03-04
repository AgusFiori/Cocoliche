// import axios from "axios";
// import { API } from './../../components/Api';

const productActions = {
  addToCart: (product) => {
    try {
      const { subcategoryId, productId, quantity } = product
      return async (dispatch, getState) => {
        dispatch({
          type: 'ADD_TO_CART',
          payload: product
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  localStorageCart: (cart) => {
    return async (dispatch, getState) => {
      try {
        dispatch({
          type: 'ADD_FROM_LS',
          payload: cart
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  removeProduct: (id) => {
    return async (dispatch, getState) => {
      try {
        const removeItem = getState().cartReducer.cart.filter(cartItem => cartItem.productId !== id)
        dispatch({ type: 'REMOVE_FROM_CART', payload: removeItem })
      } catch (error) {
        console.log(error)
      }
    }
  },
  modifyQuantity: (cant) => {
    return (dispatch, getState) => {
      const modifyItem = getState().cartReducer.cart
      console.log(modifyItem)
    }
  }
}

export default productActions