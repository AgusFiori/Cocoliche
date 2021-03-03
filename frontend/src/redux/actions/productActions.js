
import axios from 'axios'
import { API } from '../../components/Api'


const productActions = {
  getProducts: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(`${API}/products`)
        dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  addProduct: (product, file) => {
    try {
      const { name, price, description, category, delay, stock } = product
      const form = new FormData()
      form.append('name', name)
      form.append('price', price)
      form.append('description', description)
      form.append('category', category)
      form.append('delay', delay)
      form.append('stock', stock)
      form.append('file', file.result)
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/products`, form
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     'Content-Type': 'multipart/formdata',
          //   }
          // }
        )
        dispatch({
          type: 'RERENDER',
          payload: response.data.response
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  deleteProduct: (product) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.delete(`${API}/product/${product}`,
        )
        dispatch({ type: 'GET_PRODUCTS', payload: response.data.response })
      } catch (error) {
        console.log(error)
      }
    }
  },
  editProduct: (product, file) => {
    const { name, price, description, category, delay, stock, id } = product
    console.log(file)
    const editedProduct = new FormData()
    editedProduct.append('name', name)
    editedProduct.append('price', price)
    editedProduct.append('description', description)
    editedProduct.append('category', category)
    editedProduct.append('delay', delay)
    editedProduct.append('stock', stock)
    file && editedProduct.append('file', file.result)
    editedProduct.append('id', id)
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(`${API}/products`, editedProduct)
        dispatch({ type: 'RERENDER', payload: response.data.response })

      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default productActions