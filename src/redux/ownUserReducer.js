const LOGIN_USER = "LOGIN-USER"
const LOGOUT_USER = "LOGOUT-USER"
const UPDATE_INPUT_VALUES = "UPDATE-INPUT-VALUES"

const initialState = {
  logged_user: {
    username: "",
    email: "",
    token: "",
    isAuthorized: false,
    profile: {
      img: "",
      status: "",
      education: "",
      web_site: "",
      country: "",
      city: "",
      birth_date: ""
    }
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
          username: action.username,
          email: action.email,
          token: action.token,
          isAuthorized: true,
          profile: {
            img: action.img,
            status: action.status,
            education: action.education,
            web_site: action.web_site,
            country: action.country,
            city: action.city,
            birth_date: action.birth_date
          }
        }
      }
    case LOGOUT_USER:
      return {
        ...state,
        logged_user: {
          email: "",
          token: "",
          isAuthorized: false,
          profile: {
            img: "",
            status: "",
            education: "",
            web_site: "",
            country: "",
            city: "",
            birth_date: ""
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

export const loginUserAC = (user_data, profile_data) => {
  return {
    type: LOGIN_USER,
    username: user_data.username,
    email: user_data.email,
    token: user_data.token,
    img: profile_data.img,
    status: profile_data.status,
    education: profile_data.education,
    web_site: profile_data.web_site,
    country: profile_data.country,
    city: profile_data.city,
    birth_date: profile_data.birth_date
  }
}

export const logoutUserAC = () => ({
  type: LOGOUT_USER
})

export const setCurrentLoginInputValuesAC = (email, password) => ({
  type: UPDATE_INPUT_VALUES, email, password
})

export default ownUserReducer
