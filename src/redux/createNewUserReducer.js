const SET_NEW_USER_DATA = "SET-NEW-USER-DATA"

const initialState = {
  newUser: {
    username: "",
    email: "",
    password1: "",
    password2: ""
  }
}


const createNewUserReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_NEW_USER_DATA:
      return {
        ...state,
        newUser: {
          username: action.username,
          email: action.email,
          password1: action.password1,
          password2: action.password2
        }
      }
    default:
      return state
  }
}

export const setNewUserDataAC = (username, email, password1, password2) => ({
  type: SET_NEW_USER_DATA, username, email, password1, password2
})


export default createNewUserReducer