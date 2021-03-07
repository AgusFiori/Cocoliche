const initialState = {
    loggedUser: null,
    countries: []
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem('firstname', action.payload.firstname)
            localStorage.setItem('urlPic', action.payload.urlPic)
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('role', action.payload.role)
            return {
                ...state,
                loggedUser: action.payload.response
            }
        case 'LOG_OUT_USER':
            localStorage.clear()
            return {
                ...state,
                loggedUser: null
            }
        default:
            return state
    }
}

export default authReducer
