const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const UPDATE_INPUT_VALUES = "UPDATE-INPUT-VALUES"
const LOADING = "LOADING"
const FAILURE = "FAILURE"

const initialState = {
  data: {
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
  },
  inputData: {  // TODO: login data do refactor
    email: "",
    password: ""
  },
  loading: false,
  error: null
}

const ownProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("INSIDE LOGIN REDUCER", action)
      console.log("OLD STATE", state)
      const newState = {
        ...state,
        data: {
          ...state.data,
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
        },
        loading: false,
        error: null
      }
      console.log(newState)
      return newState
    case LOGOUT:
      return {
        ...state,
        data: {
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
        },
        loading: false,
        error: null
      }
    case UPDATE_INPUT_VALUES:
      return {
        ...state,
        inputData: {
          email: action.email,
          password: action.password
        },
        loading: false,
        error: null
      }
    case LOADING:
      return {
        ...state,
        data: {
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
        },
        loading: true,
        error: null
      }
    case FAILURE:
      return {
        ...state,
        data: {
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
        },
        loading: false,
        error: new Error(action.message)
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

export const loadingAC = () => ({  // TODO: create only one loadingAC and failureAC and set them in separate file
  type: LOADING
})

export const failureAC = (message) => ({
  type: FAILURE, message
})


export const loginThunkCreator = () => (dispatch) => {

}

export const getUserDataThunkCreator = (token) => async (dispatch) => {
  const responseWhoAmI = await fetch(
    "http://localhost:8080/api/v0.2/whoami",
    {headers: {"Authorization": token}}
  )
  dispatch(loadingAC())
  if (responseWhoAmI.status === 200) {
    let responseWhoAmIBody = await responseWhoAmI.json()
    const user_data = {
      user_id: responseWhoAmIBody.profile.user.id,
      username: responseWhoAmIBody.profile.user.username,
      email: responseWhoAmIBody.profile.user.email,
      token: responseWhoAmIBody.profile.user.token
    }
    const profile_data = {
      profile_id: responseWhoAmIBody.profile.id,
      img: responseWhoAmIBody.profile.img,
      status: responseWhoAmIBody.profile.status,
      education: responseWhoAmIBody.profile.education,
      web_site: responseWhoAmIBody.profile.web_site,
      country: responseWhoAmIBody.profile.country,
      city: responseWhoAmIBody.profile.city,
      birth_date: responseWhoAmIBody.profile.birth_date
    }
    console.log("BEFORE LOGIN DISPATCH")
    dispatch(loginAC(user_data, profile_data))
  } else {
    dispatch(failureAC("Error. Can`t load profile data"))
  }
}

export const logoutThunkCreator = () => (dispatch) => {

}


export default ownProfileReducer
