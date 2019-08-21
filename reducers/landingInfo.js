import { TOGGLE_SIDE_BAR } from '../constants'

const initAppState = {
  sidebar: {
    status: 'closed' // closed opened
  }
}

const landingInfoReducer = (state = initAppState, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          status: action.payload.status
        }
      }

    default:
      return state
  }
}

export default landingInfoReducer
