const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_POST_TITLE = "UPDATE-NEW-POST-TITLE"
const UPDATE_PROFILE_DATA = "UPDATE-PROFILE-DATA"
const LOAD_POST = "LOAD-POST"
const CLEAR_POSTS = "CLEAR-POSTS"

export const imgPath = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"


const initialState = {
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
    newPostTitle: "",
    newPostText: ""
}

const profileReducer = (state=initialState, action) => {
  switch(action.type) {
      // TODO: load posts and add posts refactor to one case
      case LOAD_POST:
          if (action.title && action.text) {
              return {
                  ...state,
                  posts: [...state.posts, {id: action.id, img_path: imgPath, title: action.title, text: action.text}],
                  newPostTitle: "",
                  newPostText: ""
              }
          } else {
              return state
          }
      case CLEAR_POSTS:
          return {
              ...state,
              posts: []
          }
      case UPDATE_NEW_POST_TEXT:
          return {
              ...state,
              newPostText: action.newText
          }
      case UPDATE_NEW_POST_TITLE:
          return {
              ...state,
              newPostTitle: action.newTitle
          }
      case UPDATE_PROFILE_DATA:
          return {
              ...state,
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
        type: UPDATE_PROFILE_DATA,
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


export default profileReducer