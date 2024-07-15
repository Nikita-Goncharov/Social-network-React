const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_PROFILES = "SET-PROFILES"
const TOTAL_PROFILES = "TOTAL-PROFILES"
const PAGES_COUNT = "PAGES-COUNT"
const CURRENT_PAGE = "CURRENT-PAGE"
const LOADING = "LOADING"
const FAILURE = "FAILURE"


const initialState = {
  data: {
    profiles: [],
    pagesCount: 0,
    currentPage: 1,
    countProfilesOnPage: 10,
    totalProfiles: 0,
  },
  loading: false,
  error: null
}

const findProfilesReducer = (state = initialState, action) => {
  let profilesCopy
  switch(action.type) {
    case FOLLOW:
      profilesCopy = [...state.data.profiles]

      profilesCopy = profilesCopy.map(profile => {
        if (profile.id === action.profile_id) {
          profile.followed = true
          return {...profile}
        }
        return profile
      })

      return {
        ...state,
        data: {
          ...state.data,
          profiles: profilesCopy
        },
        loading: false,
        error: null
      }
    case UNFOLLOW:
      profilesCopy = [...state.data.profiles]

      profilesCopy = profilesCopy.map(profile => {
        if (profile.id === action.profile_id) {
          profile.followed = false
          return {...profile}
        }
        return profile
      })

      return {
        ...state,
        data: {
          ...state.data,
          profiles: profilesCopy
        },
        loading: false,
        error: null
      }
    case SET_PROFILES:
      return {
        ...state,
        data: {
          ...state.data,
          profiles: action.profiles
        },
        loading: false,
        error: null
      }
    case PAGES_COUNT:
      return {
        ...state,
        data: {
          ...state.data,
          pagesCount: action.pagesCount
        }
      }
    case TOTAL_PROFILES:
      return {
        ...state,
        data: {
          ...state.data,
          totalProfiles: action.count
        }
      }
    case CURRENT_PAGE:
      return {
        ...state,
        data: {
          ...state.data,
          currentPage: action.currentPage
        }
      }
    case LOADING:
      return {
        ...state,
        data: {
          profiles: [],
          pagesCount: 0,
          currentPage: 1,
          countProfilesOnPage: 10,
          totalProfiles: 0,
        },
        loading: true,
        error: null
      }
    case FAILURE:
      return {
        ...state,
        data: {
          profiles: [],
          pagesCount: 0,
          currentPage: 1,
          countProfilesOnPage: 10,
          totalProfiles: 0,
        },
        loading: false,
        error: new Error(action.message)
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

export const loadingAC = () => ({
  type: LOADING
})

export const failureProfilesAC = (message) => ({
  type: FAILURE, message
})


export const findProfilesThunkCreator = (userIsAuthorized, token, currentPage, countProfilesOnPage) => {
  return async (dispatch) => {
    dispatch(loadingAC())
    let headers = {}
    if (userIsAuthorized) {
      headers = {Authorization: token}
    }
    const response = await fetch(
      `http://localhost:8080/api/v0.2/profiles?page=${currentPage}&count=${countProfilesOnPage}`,
      {headers: headers}
    )

    if (response.status === 200) {
      const responseJSON = await response.json()
      dispatch(setProfilesAC(responseJSON.profiles))
      dispatch(totalProfilesAC(responseJSON.total_count))
      dispatch(pagesCountAC(Math.ceil(responseJSON.total_count / countProfilesOnPage)))
    } else {
     dispatch(failureProfilesAC("Error. Can`t fetch profiles."))
    }
  }
}

export const followUnfollowProfileThunkCreator = (token, currentFollowingState, profileId) => {
  return async (dispatch) => {
    const action = currentFollowingState === true ? "DELETE" : "POST"
    dispatch(loadingAC())
    const response = await fetch(
      "http://localhost:8080/api/v0.2/follow",
      {
        method: action,
        headers: {Authorization: token},
        body: JSON.stringify({"profile_id": profileId})
      }
    )
    if (response.status === 200) {
      if (currentFollowingState) {
        dispatch(unfollowProfileAC(profileId))
      } else {
        dispatch(followProfileAC(profileId))
      }
    } else {
      dispatch(failureProfilesAC("Error. Can`t follow or unfollow profile."))
    }
  }
}


export default findProfilesReducer