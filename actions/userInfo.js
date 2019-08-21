import { SAVE_USER_INFO } from '../constants'

export const saveUserInfo = userInfo => {
  return {
    type:    SAVE_USER_INFO,
    payload: {
      userInfo
    }
  }
}
