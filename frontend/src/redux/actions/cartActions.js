import axios from "axios";
import { API } from './../../components/Api';

const productActions = {
  addToCart: (product) => {
    console.log(product)
    try {
      return async (dispatch, getState) => {
        const cart = getState().cartReducer.cart.concat(product)
        dispatch({
          type: 'ADD_TO_CART',
          payload: cart
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
        const removeItem = getState().cartReducer.cart.filter(cartItem => cartItem.subcategory.subcategoryId !== id)
        dispatch({ type: 'REMOVE_FROM_CART', payload: removeItem })
      } catch (error) {
        console.log(error)
      }
    }
  },
  modifyQuantity: (cant, idSubItem) => {
    return (dispatch, getState) => {
      const copyCart = getState().cartReducer.cart.slice()
      let modifyItem = copyCart.find(cartItem => cartItem.subcategory.subcategoryId === idSubItem);
      modifyItem.quantity = cant
      let indiMod = copyCart.findIndex((item) => {
        return item.subcategory.subcategoryId === idSubItem
      })
      copyCart.splice(indiMod, 1, modifyItem)
      dispatch({ type: 'MODIFY_QTY', payload: copyCart })
    }
  },
  confirmPurchase: (newCart) => {
    const { token, cart } = newCart
    return async (dispatch, getState) => {
      const response = await axios.post(`${API}/purchases`, cart,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      console.log(response)
      dispatch({
        type: "CONFIRM_PURCHASE",
        payload: ""
      })
    }
  }
}

export default productActions