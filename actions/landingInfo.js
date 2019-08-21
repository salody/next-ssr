import { TOGGLE_SIDE_BAR } from '../constants'

export const toggleSidebar = status => {
  return {
    type:    TOGGLE_SIDE_BAR,
    payload: {
      status
    }
  }
}
