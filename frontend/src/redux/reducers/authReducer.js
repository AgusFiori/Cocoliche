const initialState = {
    loggedUser: null,
    countries: []
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem('firstname', action.payload.response.firstname)
            localStorage.setItem('urlPic', action.payload.response.urlPic)
            localStorage.setItem('token', action.payload.response.token)
            localStorage.setItem('role', action.payload.response.role)
            return {
                ...state,
                loggedUser: action.payload.response
            }
        case 'LOG_OUT_USER':
            localStorage.removeItem('firstname')
            localStorage.removeItem('urlPic')
            localStorage.removeItem('token')
            localStorage.removeItem('role')

            return {
                ...state,
                loggedUser: null
            }
        default:
            return state
    }
}

export default authReducer
