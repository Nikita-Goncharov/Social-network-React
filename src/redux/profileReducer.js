const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
export const img_path = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"


let initialState = {
  posts: [
    {id: 1, img_path: img_path, text: "Hello, man"},
    {id: 2, img_path: img_path, text: "Hello world!"},
    {id: 3, img_path: img_path, text: "How are you ?"},
    {id: 4, img_path: img_path, text: "Hi bro"},
  ],
  newPostText: "Default post text"
}

const profileReducer = (state=initialState, action) => {
  if (action.type === ADD_POST) {
    let lastPostId = state.posts[state.posts.length-1].id
    return {
      ...state,
      posts: [...state.posts, {id: lastPostId+1, img_path: img_path, text: state.newPostText}],
      newPostText: ""
    }
  } else if (action.type === UPDATE_NEW_POST_TEXT) {
    return {
      ...state,
      newPostText: action.newText
    }
  } else {
    return state
  }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = text => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
)

export default profileReducer