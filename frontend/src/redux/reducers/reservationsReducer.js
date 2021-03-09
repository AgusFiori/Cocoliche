const initialState = {
    reservations: []
}

function reservationsReducer (state = initialState, action) {
    switch (action.type) {
        
        case 'GET_RESERVATIONS':
            return {
                ...state,
                reservations: action.payload
            }
        case 'RESERVATION':
            return {
                ...state,
                reservations: state.reservations.concat(action.payload)
            }
        default:
            return state
    }
}

export default reservationsReducer