const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_POST_TITLE = "UPDATE-NEW-POST-TITLE"
const UPDATE_PROFILE_DATA = "UPDATE-PROFILE-DATA"
const LOAD_POST = "LOAD-POST"
const CLEAR_POSTS = "CLEAR-POSTS"

export const imgPath = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"


const initialState = {
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
            email: ""
        }
    },
    posts: [
        // {id: 1, img_path: imgPath, title: "Greeting", text: "Hello, man"},
    ],
    newPostTitle: "",
    newPostText: ""
}

const profileReducer = (state=initialState, action) => {
  switch(action.type) {
      // TODO: load posts and add posts refactor to one case
      case LOAD_POST:
          return {
              ...state,
              posts: [...state.posts, {id: action.id, img_path: imgPath, title: action.title, text: action.text}],
          }
      case CLEAR_POSTS:
          return {
              ...state,
              posts: []
          }
      case ADD_POST:
          const lastPost = state.posts[state.posts.length-1]
          const lastPostId = lastPost ? state.posts[state.posts.length-1].id : 0
          if (state.newPostTitle && state.newPostText) {
              return {
                  ...state,
                  posts: [...state.posts, {id: lastPostId+1, img_path: imgPath, title: state.newPostTitle, text: state.newPostText}],
                  newPostTitle: "",
                  newPostText: ""
              }
          } else {
              return state
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

export const addPostAC = () => ({type: ADD_POST})

export const updateNewPostTextAC = text => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
)

export const updateNewPostTitleAC = (title) => (
    {type: UPDATE_NEW_POST_TITLE, newTitle: title}
)

export const updateProfileDataAC = (user_data, profile_data) => (  // TODO: change name from update to set
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