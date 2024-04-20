const LOGIN_USER = "LOGIN-USER"
const LOGOUT_USER = "LOGOUT-USER"
const UPDATE_INPUT_VALUES = "UPDATE-INPUT-VALUES"

const initialState = {
  logged_user: {
    email: "",
    token: "",
    isAuthenticated: false
  },
  currentInputValues: {
    email: "",
    password: ""
  }
}

const ownUserReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        logged_user: {
          email: action.email,
          token: action.token,
          isAuthenticated: true
        }
      }
    case LOGOUT_USER:
      return {
        ...state,
        logged_user: {
          email: "",
          token: "",
          isAuthenticated: false
        }
      }
    case UPDATE_INPUT_VALUES:
      return {
        ...state,
        currentInputValues: {
          email: action.email,
          password: action.password
        }
      }
    default:
      return state
  }
}

export const loginUserAC = (email, token) => ({
  type: LOGIN_USER, email, token
})

export const logoutUserAC = () => ({
  type: LOGOUT_USER
})

export const setCurrentLoginInputValuesAC = (email, password) => ({
  type: UPDATE_INPUT_VALUES, email, password
})

export default ownUserReducer
