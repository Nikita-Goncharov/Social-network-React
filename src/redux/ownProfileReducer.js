const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const UPDATE_INPUT_VALUES = "UPDATE-INPUT-VALUES"

const initialState = {
  profile: {
    id: 0,
    img: "",
    status: "",
    education: "",
    web_site: "",
    country: "",
    city: "",
    birth_date: "",
    user: {
      id: 0,
      username: "",
      email: "",
      token: "",
      isAuthorized: false
    }
  },
  currentInputValues: {  // TODO: login data do refactor
    email: "",
    password: ""
  }
}

const ownProfileReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        profile: {
          id: action.profile_id,
          img: action.img,
          status: action.status,
          education: action.education,
          web_site: action.web_site,
          country: action.country,
          city: action.city,
          birth_date: action.birth_date,
          user: {
            id: action.user_id,
            username: action.username,
            email: action.email,
            token: action.token,
            isAuthorized: true
          }
        }
      }
    case LOGOUT:
      return {
        ...state,
        profile: {
          id: 0,
          img: "",
          status: "",
          education: "",
          web_site: "",
          country: "",
          city: "",
          birth_date: "",
          user: {
            id: 0,
            username: "",
            email: "",
            token: "",
            isAuthorized: false
          }
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

export const loginAC = (user_data, profile_data) => {
  return {
    type: LOGIN,
    profile_id: profile_data.profile_id,
    img: profile_data.img,
    status: profile_data.status,
    education: profile_data.education,
    web_site: profile_data.web_site,
    country: profile_data.country,
    city: profile_data.city,
    birth_date: profile_data.birth_date,

    user_id: user_data.user_id,
    username: user_data.username,
    email: user_data.email,
    token: user_data.token,
  }
}

export const logoutAC = () => ({
  type: LOGOUT
})

export const setCurrentLoginInputValuesAC = (email, password) => ({
  type: UPDATE_INPUT_VALUES, email, password
})

export default ownProfileReducer
