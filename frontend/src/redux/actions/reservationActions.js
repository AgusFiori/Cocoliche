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
            if(response.data.success){
                Swal.fire("Reserva enviada")
            } else {
                Swal.fire("Algo falló")
            }
        }
    }
}

export default reservedActions