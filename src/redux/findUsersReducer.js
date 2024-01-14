const FOLLOW_USER = "FOLLOW-USER"

const SET_USERS = "SET-USERS"

const initialState = {
  users: []
}

const findUsersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FOLLOW_USER:
      let usersCopy = [...state.users]

      usersCopy = usersCopy.map(user => {
        if (user.id === action.user_id) {
          user.followed = !user.followed
          return {...user}
        }
        return user
      })
      return {
        ...state,
        users: usersCopy
      }
    case SET_USERS:  // Add users to state from API
        if (state.users.length === 0) {
          return {
            ...state,
            users: [...state.users, ...action.users]
          }
        }
        return state
    case "AAA-AA":
      return state
    default:
      return state
  }
}

export const followUserActionCreator = (user_id) => {
  return {type: FOLLOW_USER, user_id: user_id}
}


// Users from API when component loaded
export const setUsersAC = (users) => {
  return {type: SET_USERS, users: users}
}

export default findUsersReducer