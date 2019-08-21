import { combineReducers } from 'redux'

import userInfo from './userInfo'
import loading from './loading'
import exam from './exam'
import landingInfo from './landingInfo'
import practice from './practice'
import previewDoc from './previewDoc'

const rootReducer = combineReducers({
  userInfo,
  loading,
  exam,
  landingInfo,
  practice,
  previewDoc
})

export default rootReducer
