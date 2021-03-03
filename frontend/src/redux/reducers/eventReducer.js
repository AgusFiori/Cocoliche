
const initialState = {
    events: [],
    newEvent: [],
    filter: [],
  }
  
function eventReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_ARTICLE':
        return {
          ...state,
          newEvent: action.payload
        }
      case 'GET_EVENTS':
        return {
          ...state,
          events: action.payload,
          filter: action.payload
        }
      case 'SEARCH_EVENTS':
          return {
              ...state,
              filter: state.events.filter(event => event.title.toUpperCase().includes(action.payload.toUpperCase().trim())
            || event.artist.toUpperCase().includes(action.payload.toUpperCase().trim())  
              || event.user.categoty.toUpperCase().includes(action.payload.toUpperCase().trim()))
        }
        default:
        return state
      }
  }
  
  export default eventReducer