
import axios from 'axios'
import { API } from '../../components/Api'


const productActions = {
  addProduct: (product, file) => {
    console.log(product, file)
    try {
      const { name, price, description, category, delay, token } = product
      const form = new FormData()
      form.append('name', name)
      form.append('price', price)
      form.append('description', description)
      form.append('category', category)
      form.append('delay', delay)
      form.append('file', file.result)
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/products/addProduct`, form
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     'Content-Type': 'multipart/formdata',
          //   }
          // }
        )
        dispatch({
          type: 'ADD_PRODUCT',
          payload: response.data.response
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default productActions