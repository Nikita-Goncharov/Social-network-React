const SET_NEW_USER_DATA = "SET-NEW-USER-DATA"
const LOADING = "LOADING"
const FAILURE = "FAILURE"

const initialState = {
  inputData: {
    username: "",
    email: "",
    password1: "",
    password2: ""
  },
  loading: false,
  error: null
}


const createNewUserReducer = (state=initialState, action) => {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        inputData: {
          username: "",
          email: "",
          password1: "",
          password2: ""
        },
        loading: true,
        error: null
      }
    case SET_NEW_USER_DATA:
      return {
        ...state,
        inputData: {
          username: action.username,
          email: action.email,
          password1: action.password1,
          password2: action.password2
        },
        loading: false,
        error: null
      }
    case FAILURE:
      return {
        ...state,
        inputData: {
          username: "",
          email: "",
          password1: "",
          password2: ""
        },
        loading: false,
        error: new Error(action.message)
      }
    default:
      return state
  }
}

export const setNewUserDataAC = (username, email, password1, password2) => ({
  type: SET_NEW_USER_DATA, username, email, password1, password2
})

export const createLoadingUserDataAC = () => ({
  type: LOADING
})

export const createFailureUserDataAC = (message) => ({
  type: FAILURE, message
})

export const createNewUserThunkCreator = (username, email, password1, password2) => (dispatch) => {
  if (username.length < 2 || email.length < 2 || !email.includes("@") || password1.length < 2 || password2.length < 2) {
    dispatch(createFailureUserDataAC("Error. User data is not valid."))
  } else {
    if (password1 === password2) {
      dispatch(createLoadingUserDataAC())
      fetch(
        "http://localhost:8080/api/v0.2/register",
        {method: "POST", body: JSON.stringify({username: username, email: email, password: password1})}
      ).then(response => {
        if (response.status !== 200) {
          dispatch(createFailureUserDataAC("Error. User already created."))
        } else {
          dispatch(setNewUserDataAC("", "", "", ""))  // Just for reset loading state
        }
      }).catch(error => {
        dispatch(createFailureUserDataAC("Error. API is not accessible."))
      })
    } else {
      dispatch(createFailureUserDataAC("Error. Passwords are not the same."))
    }
  }
}

export default createNewUserReducer