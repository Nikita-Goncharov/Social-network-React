const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_POST_TITLE = "UPDATE-NEW-POST-TITLE"
const UPDATE_PROFILE_DATA = "UPDATE-PROFILE-DATA"
export const img_path = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"


let initialState = {
    id: 0,
    img: "",
    birth_date: "",
    city: "",
    country: "",
    created: "",
    education: "",
    status: "",
    username: "",
    web_site: "",
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
              img: action.profile.img,
              birth_date: action.profile.birth_date,
              city: action.profile.city,
              country: action.profile.country,
              created: action.profile.created,
              education: action.profile.education,
              id: action.profile.id,
              status: action.profile.status,
              username: action.profile.user.username,
              web_site: action.profile.web_site
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

export const updateProfileDataActionCreator = new_profile_data => (
    {type: UPDATE_PROFILE_DATA, profile: new_profile_data}
)


export default profileReducer