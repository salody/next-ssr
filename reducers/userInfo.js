import { SAVE_USER_INFO } from '../constants'

const defaultAvatar = 'https://oss.coolcollege.cn/1791134803416977408.png'
const initUserState = {
  access_token: '',
  userId:       '',
  enterpriseId: '',
  name:         '',
  watermarks:   [],
  language:     'zh',
  avatar:       '',
  position:     '',
  jobnumber:    '',
  documentMode: ''
}

const userInfoReducer = (state = initUserState, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        ...action.payload.userInfo,
        avatar: action.payload.userInfo.avatar || defaultAvatar
      }

    default:
      return state
  }
}

export default userInfoReducer
