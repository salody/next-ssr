import { SET_LOADING } from '../constants'

export const setLoading = (scope, loading) => {
  return {
    type:    SET_LOADING,
    payload: {
      scope,
      loading
    }
  }
}
