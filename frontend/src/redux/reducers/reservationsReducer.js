const initialState = {
    reservations: []
}

function reservationsReducer (state = initialState, action) {
    switch (action.type) {
        
        case 'RESERVATION':
            return {
                ...state,
                reservations: action.payload
            }
        default:
            return state
    }
}

export default reservationsReducer