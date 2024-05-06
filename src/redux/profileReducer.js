const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_POST_TITLE = "UPDATE-NEW-POST-TITLE"
const UPDATE_PROFILE_DATA = "UPDATE-PROFILE-DATA"
export const img_path = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"


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
        {id: 1, img_path: img_path, title: "Greeting", text: "Hello, man"},
    ],
    newPostTitle: "Default title",
    newPostText: "Default post text"
}

const profileReducer = (state=initialState, action) => {
  switch(action.type) {
      case ADD_POST:
          let lastPostId = state.posts[state.posts.length-1].id
          return {
              ...state,
              posts: [...state.posts, {id: lastPostId+1, img_path: img_path, title: state.newPostTitle, text: state.newPostText}],
              newPostTitle: "",
              newPostText: ""
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

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = text => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
)

export const updateNewPostTitleActionCreator = (title) => (
    {type: UPDATE_NEW_POST_TITLE, newTitle: title}
)

export const updateProfileDataActionCreator = (user_data, profile_data) => (
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