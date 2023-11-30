const img_path = "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"

const basic_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nam arcu velit, dapibus vitae pretium vitae, hendrerit a dolor. Mauris eget dictum arcu.
  Aenean facilisis aliquam purus.
  Pellentesque pulvinar, est at blandit egestas, nibh turpis scelerisque ex, nec feugiat ipsum est non tortor.
  Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vehicula tortor id ipsum elementum tempus.`


const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SEND_MESSAGE = "SEND-MESSAGE"
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"


const store = {
  _state: {
    profilePage: {
      posts: [
        {id: "1", img_path: img_path, text: "Hello, man"},
        {id: "2", img_path: img_path, text: "Hello world!"},
        {id: "3", img_path: img_path, text: "How are you ?"},
        {id: "4", img_path: img_path, text: "Hi bro"},
      ],
      newPostText: "Default post text"
    },
    messagePage: {
      messages: [
        {id: "1", user_name: "Dmitry", text: basic_text},
        {id: "2", user_name: "Dmitry", text: basic_text},
        {id: "3", user_name: "Me", text: basic_text},
        {id: "4", user_name: "Dmitry", text: basic_text},
        {id: "5", user_name: "Me", text: basic_text},
      ],
      dialogs: [
        {id: "1", name: "Andrew"},
        {id: "2", name: "Dmitry"},
        {id: "3", name: "Sasha"},
        {id: "4", name: "Sveta"},
        {id: "5", name: "Victor"},
      ],
      newMessageText: ""
    }
  },

  getState() {
    return this._state
  },

  _rerenderUI() {
    return "default func"
  },
  subscribe(observer) {
    this._rerenderUI = observer
  },

  _addPost() {
    let newPost = {
      id: "5",
      img_path: img_path,
      text: this._state.profilePage.newPostText
    }
    this._state.profilePage.posts.push(newPost)
    this._rerenderUI(this)
  },

  _changeNewPostText(newText) {
    this._state.profilePage.newPostText = newText
    this._rerenderUI(this)
  },


  _sendMessage() {
    let newMessage = {
      id: "77", user_name: "Me", text: this._state.messagePage.newMessageText
    }

    this._state.messagePage.messages.push(newMessage)
    this._rerenderUI(this)
  },

  _changeNewMessageText(newText) {
    this._state.messagePage.newMessageText = newText
    this._rerenderUI(this)
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      this._addPost()
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._changeNewPostText(action.newText)
    } else if (action.type === SEND_MESSAGE) {
      this._sendMessage()
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
      this._changeNewMessageText(action.newText)
    }
  }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = text => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
)

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextActionCreator = text => (
  {type: UPDATE_NEW_MESSAGE_TEXT, newText: text}
)

export default store