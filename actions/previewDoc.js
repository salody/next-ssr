import { INIT_PREVIEW_DOC } from '../constants'

export const initPreviewDoc = ({ docType, docTitle, url, aliUrl }) => {
  return {
    type:    INIT_PREVIEW_DOC,
    payload: {
      docType,
      docTitle,
      url,
      aliUrl
    }
  }
}
