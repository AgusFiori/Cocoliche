import axios from 'axios';
import { API } from '../../components/Api';
import  Swal  from 'sweetalert2';


const reservedActions = {

    sendReservation: (pedido) => {
        const {reservation, token} = pedido
        return async (dispatch, getState) => {
            const response = await axios.post(`${API}/reservation`, reservation, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                        }      
            }
            )
            console.log(response)
            if(response.data.success){
                Swal.fire("Reserva enviada, recibirá un mail con la confirmación")
                dispatch({type: 'RESERVATION', payload: response.data.response})
                
            } else {
                Swal.fire("Lo siento, su reserva no se ha podido registrar")
            }
        }
    }
}

export default reservedActions