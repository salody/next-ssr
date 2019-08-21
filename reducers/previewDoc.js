import { INIT_PREVIEW_DOC } from '../constants'

const initState = {
  docType:  '',
  docTitle: '',
  url:      '',
  aliUrl:   ''
}

const previewDocReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_PREVIEW_DOC:
      return {
        ...state,
        docType:  action.payload.docType,
        docTitle: action.payload.docTitle,
        url:      action.payload.url,
        aliUrl:   action.payload.aliUrl
      }
    default:
      return state
  }
}

export default previewDocReducer
