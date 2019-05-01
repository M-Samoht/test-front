const TYPES = {
  ALLERT_ADD: 'ALLERT_ADD',
  ALLERT_REMOVE: 'ALLERT_REMOVE'
}

const initialState = []

export const alertAdd = ({ color, text }) => {
  const id = Date.now()
  return dispatch => {
    dispatch({
      type: TYPES.ALLERT_ADD,
      alert: {
        color,
        text,
        id
      }
    })
    setTimeout(() => {
      dispatch(alertRemove(id))
    }, 4000)
  }
}

export const alertRemove = id => {
  return {
    type: TYPES.ALLERT_REMOVE,
    id
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ALLERT_ADD:
      state = [...state, action.alert]
      return state
    case TYPES.ALLERT_REMOVE:
      state = state.filter(alert => alert.id !== action.id)
      return state

    default:
      return state
  }
}
