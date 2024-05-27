const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_PROFILES = "SET-PROFILES"
const TOTAL_PROFILES = "TOTAL-PROFILES"
const PAGES_COUNT = "PAGES-COUNT"
const CURRENT_PAGE = "CURRENT-PAGE"
const FETCHING = "FETCHING"


const initialState = {
  profiles: [],
  pagesCount: 0,
  currentPage: 1,
  countProfilesOnPage: 10,
  totalProfiles: 0,
  isFetching: false
}

const findProfilesReducer = (state = initialState, action) => {
  let profilesCopy
  switch(action.type) {
    case FOLLOW:
      profilesCopy = [...state.profiles]

      profilesCopy = profilesCopy.map(profile => {
        if (profile.id === action.profile_id) {
          profile.followed = true
          return {...profile}
        }
        return profile
      })

      return {
        ...state,
        profiles: profilesCopy
      }
    case UNFOLLOW:
      profilesCopy = [...state.profiles]

      profilesCopy = profilesCopy.map(profile => {
        if (profile.id === action.profile_id) {
          profile.followed = false
          return {...profile}
        }
        return profile
      })

      return {
        ...state,
        profiles: profilesCopy
      }
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.profiles
      }
    case PAGES_COUNT:
      return {
        ...state,
        pagesCount: action.pagesCount
      }
    case TOTAL_PROFILES:
      return {
        ...state,
        totalProfiles: action.count
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

export const followProfileAC = (profile_id) => {
  return {type: FOLLOW, profile_id}
}

export const unfollowProfileAC = (profile_id) => {
  return {type: UNFOLLOW, profile_id}
}

// Profiles from API when component loaded
export const setProfilesAC = (profiles) => {
  return {type: SET_PROFILES, profiles}
}

export const totalProfilesAC = (count) => {
  return {type: TOTAL_PROFILES, count}
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


export default findProfilesReducer