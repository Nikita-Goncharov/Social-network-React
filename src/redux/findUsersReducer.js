const FOLLOW_USER = "FOLLOW-USER"
const SET_USERS = "SET-USERS"
const TOTAL_USERS = "TOTAL-USERS"
const PAGES_COUNT = "PAGES-COUNT"
const CURRENT_PAGE = "CURRENT-PAGE"
const FETCHING = "FETCHING"


const initialState = {
  users: [],
  pagesCount: 0,
  currentPage: 1,
  countUsersOnPage: 10,
  totalUsers: 0,
  isFetching: false
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
      return {
        ...state,
        users: action.users
      }
    case PAGES_COUNT:
      return {
        ...state,
        pagesCount: action.pagesCount
      }
    case TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.count
      }
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
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

export const totalUsersAC = (count) => {
  return {type: TOTAL_USERS, count}
}

export const pagesCountAC = (pagesCount) => {
  return {type: PAGES_COUNT, pagesCount}
}

export const currentPageAC = (currentPage) => {
  return {type: CURRENT_PAGE, currentPage}
}

export const fetchingAC = (isFetching) => {
  return {type: FETCHING, isFetching}
}


export default findUsersReducer