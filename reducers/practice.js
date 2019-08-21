import { CHANGE_PRACTICE_TYPE } from '../constants'

const initState = {
  isContinue: false
}

const practiceReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_PRACTICE_TYPE:
      return {
        ...state,
        isContinue: action.payload.isContinue
      }
    default:
      return state
  }
}

export default practiceReducer
