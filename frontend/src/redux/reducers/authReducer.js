const initialState = {
    loggedUser: null,
    countries:[]
}

function authReducer (state = initialState, action) {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem('name', action.payload.response.name)
            localStorage.setItem('profilePicture', action.payload.response.profilePicture)
            localStorage.setItem('token', action.payload.response.token)
            localStorage.setItem('username', action.payload.response.username)
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