import { CHANGE_PRACTICE_TYPE } from '../constants'

export const changePracticeType = isContinue => {
  return {
    type:    CHANGE_PRACTICE_TYPE,
    payload: {
      isContinue
    }
  }
}
