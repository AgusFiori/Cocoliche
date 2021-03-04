import axios from "axios"
import  Swal  from 'sweetalert2';
import { API } from './../../components/Api';

const eventsActions = {
    newEvent: (newEvent, file, token) => {
      console.log(newEvent, file)
        return async (dispatch, getState) => {
          try{
            const form = new FormData()
            form.append('title',newEvent.title)
            form.append('descripcion',newEvent.description)
            form.append('category',newEvent.category)
            form.append('dateEvent',newEvent.date)
            form.append('file', file.result)
            const respuesta = await axios.post(`${API}/events`, form, 
            // {
            //      headers:{
            //          'Authorization': `Bearer ${token}`,
            //          'Content-Type':'multipart/formdata'
            //  }}
             )
             if (!respuesta.data.success) {
                 return respuesta.data
             }
            dispatch({type: 'ADD_ARTICLE', payload: respuesta.data.response})
            console.log(respuesta)
        }catch(error){
          Swal.fire(error)
        }       
    }

  },
  
  getEvents: () => {
    return async (dispatch, getState) => {
      try {
				const response = await axios.get(`${API}/events`)
				dispatch({type: 'GET_EVENTS', payload: response.data.response})
        console.log(response.data.response)
			}catch(error){
        Swal.fire(error)}
      }
  },
}

export default eventsActions