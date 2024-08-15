const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_POST_TITLE = "UPDATE-NEW-POST-TITLE"
const LOAD_PROFILE_DATA = "LOAD-PROFILE-DATA"
const LOAD_POST = "LOAD-POST"
const CLEAR_POSTS = "CLEAR-POSTS"

const LOADING = "LOADING"
const FAILURE = "FAILURE"


export const imgPath = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"


const initialState = {
  data: {
    profile: {
      id: null,
      img: "",
      status: "",
      education: "",
      web_site: "",
      country: "",
      city: "",
      birth_date: "",
      user: {
        id: null,
        username: "",
        email: ""
      }
    },
    posts: [],
  },
  inputData: {
    newPostTitle: "",
    newPostText: "",
  },
  loading: false,
  error: null
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST:
      if (action.title && action.text) {
        return {
          ...state,
          data: {
            ...state.data,
            posts: [...state.data.posts, {id: action.id, img_path: imgPath, title: action.title, text: action.text}],
          },
          inputData: {
            ...state.inputData,
            newPostTitle: "",
            newPostText: ""
          },
          loading: false,
          error: null
        }
      } else {
        return state
      }
    case CLEAR_POSTS:
      return {
        ...state,
        data: {
          ...state.data,
          posts: []
        },
        loading: false,
        error: null
      }
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        inputData: {
          ...state.inputData,
          newPostText: action.newText
        }
      }
    case UPDATE_NEW_POST_TITLE:
      return {
        ...state,
        inputData: {
          ...state.inputData,
          newPostTitle: action.newTitle
        }
      }
    case LOAD_PROFILE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          profile: {
            id: action.profile_id,
            img: action.img,
            birth_date: action.birth_date,
            city: action.city,
            country: action.country,
            created: action.created,
            education: action.education,
            status: action.status,
            web_site: action.web_site,

            user: {
              id: action.user_id,
              username: action.username,
              email: action.email,
            }
          }
        },
        loading: false,
        error: null
      }
    case LOADING:
      return {
        ...state,
        data: {
          profile: {
            id: null,
            img: "",
            status: "",
            education: "",
            web_site: "",
            country: "",
            city: "",
            birth_date: "",
            user: {
              id: null,
              username: "",
              email: ""
            }
          },
          posts: [],
        },
        loading: true,
        error: null
      }
    case FAILURE:
      return {
        ...state,
        data: {
          profile: {
            id: null,
            img: "",
            status: "",
            education: "",
            web_site: "",
            country: "",
            city: "",
            birth_date: "",
            user: {
              id: null,
              username: "",
              email: ""
            }
          },
          posts: [],
        },
        loading: false,
        error: new Error(action.message)
      }
    default:
      return state
  }
}

export const clearPreviousPostsAC = () => ({
  type: CLEAR_POSTS
})

export const loadPostAC = (id, title, text) => ({
  type: LOAD_POST, id, title, text
})

export const updateNewPostTextAC = text => (
  {type: UPDATE_NEW_POST_TEXT, newText: text}
)

export const updateNewPostTitleAC = (title) => (
  {type: UPDATE_NEW_POST_TITLE, newTitle: title}
)

export const setProfileDataAC = (user_data, profile_data) => (
  {
    type: LOAD_PROFILE_DATA,
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
  }
)


export const loadingAC = () => ({
  type: LOADING
})

export const failureAC = (message) => ({
  type: FAILURE, message
})

export const getProfileThunkCreator = (profileId) => async (dispatch) => {
  dispatch(loadingAC())
  let response = await fetch(`http://localhost:8080/api/v0.2/profile?profile_id=${profileId}`)
  if (response.status === 200) {
    let responseJSON = await response.json()
    const user_data = {
      user_id: responseJSON.profile.user.id,
      username: responseJSON.profile.user.username,
      email: responseJSON.profile.user.email
    }
    const profile_data = {
      profile_id: responseJSON.profile.id,
      img: responseJSON.profile.img,
      status: responseJSON.profile.status,
      education: responseJSON.profile.education,
      web_site: responseJSON.profile.web_site,
      country: responseJSON.profile.country,
      city: responseJSON.profile.city,
      birth_date: responseJSON.profile.birth_date
    }

    dispatch(setProfileDataAC(user_data, profile_data))
  } else {
    dispatch(failureAC("Error. Can`t fetch profile."))
  }
}

export const loadPostsThunkCreator = (profileId) => async (dispatch) => {
  // TODO: pagination
  // dispatch(loadingAC())
  const count = 10
  const page = 1
  dispatch(clearPreviousPostsAC())
  const response = await fetch(`http://localhost:8080/api/v0.2/posts?count=${count}&page=${page}&profile_id=${profileId}`)
  if (response.status === 200) {
    const responseJSON = await response.json()
    const posts = responseJSON.posts
    for (const post of posts) {
      const {id, title, description} = post
      dispatch(loadPostAC(id, title, description))
    }
  } else {
    // dispatch(failureAC("Error. Can`t fetch profile posts."))
  }
}

export const createPostThunkCreator = (title, text, token) => async (dispatch) => {
  // dispatch(loadingAC())  // TODO: loading and error for posts
  const response = await fetch(
    `http://localhost:8080/api/v0.2/posts`,
    {
      method: "POST",
      headers: {"Authorization": token},
      body: JSON.stringify({
        title: title,
        description: text
      })
    }
  )
  if (response.status === 200) {
    const responseJSON = await response.json()
    const postId = responseJSON.post_id
    dispatch(loadPostAC(postId, title, text))
  } else {
    // dispatch(failureAC("Error. Can`t create post."))
  }
}


export default profileReducer
