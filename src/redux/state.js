import profileReducer, {img_path} from "./profileReducer";
import messagesReducer from "./messagesReducer";

const basic_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nam arcu velit, dapibus vitae pretium vitae, hendrerit a dolor. Mauris eget dictum arcu.
  Aenean facilisis aliquam purus.
  Pellentesque pulvinar, est at blandit egestas, nibh turpis scelerisque ex, nec feugiat ipsum est non tortor.
  Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vehicula tortor id ipsum elementum tempus.`


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

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.messagePage = messagesReducer(this._state.messagePage, action)
    this._rerenderUI(this)
  }
}

export default store