import { alertAdd } from './alert'

const TYPES = {
  AUTH_LOGIN: 'auth_login',
  AUTH_LOGOUT: 'auth_logout',
  AUTH_UPDATE: 'auth_update'
}

const { token, user } = JSON.parse(localStorage.getItem('auth')) || {}

const initialState = {
  user: user || null,
  token: token || null
}

export const authLogin = payload => {
  localStorage.setItem('auth', JSON.stringify(payload))

  return dispatch => {
    dispatch({
      type: TYPES.AUTH_LOGIN,
      ...payload
    })
    dispatch(
      alertAdd({
        color: 'success',
        text: `Bonjour ${payload.user.username} ! Vous êtes maintenant connecté`
      })
    )
  }
}
export const authUpdate = user => {
  let auth = JSON.parse(localStorage.getItem('auth'))
  auth.user = user
  localStorage.setItem('auth', JSON.stringify(auth))
  return {
    type: TYPES.AUTH_UPDATE,
    user
  }
}
export const authLogout = () => {
  localStorage.removeItem('auth')
  return dispatch => {
    dispatch({
      type: TYPES.AUTH_LOGOUT
    })
    dispatch(
      alertAdd({
        color: 'info',
        text: `Vous êtes maintenant déconnecté`
      })
    )
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUTH_LOGIN:
      state = { user: action.user, token: action.token }
      return state
    case TYPES.AUTH_UPDATE:
      state = { ...state, user: action.user }
      return state
    case TYPES.AUTH_LOGOUT:
      state = { user: null, token: null }
      return state
    default:
      return state
  }
}
