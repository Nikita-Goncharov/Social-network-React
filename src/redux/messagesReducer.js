const SEND_MESSAGE = "SEND-MESSAGE"
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"
const basic_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nam arcu velit, dapibus vitae pretium vitae, hendrerit a dolor. Mauris eget dictum arcu.
  Aenean facilisis aliquam purus.
  Pellentesque pulvinar, est at blandit egestas, nibh turpis scelerisque ex, nec feugiat ipsum est non tortor.
  Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vehicula tortor id ipsum elementum tempus.`


let initialState = {
  messages: [
    {id: 1, user_name: "Dmitry", text: basic_text},
    {id: 2, user_name: "Dmitry", text: basic_text},
    {id: 3, user_name: "Me", text: basic_text},
    {id: 4, user_name: "Dmitry", text: basic_text},
    {id: 5, user_name: "Me", text: basic_text},
  ],
  dialogs: [
    {id: 1, name: "Andrew"},
    {id: 2, name: "Dmitry"},
    {id: 3, name: "Sasha"},
    {id: 4, name: "Sveta"},
    {id: 5, name: "Victor"},
  ],
  newMessageText: ""
}


const messagesReducer = (state=initialState, action) => {
  if (action.type === SEND_MESSAGE) {
    let lastMessageId = state.messages[state.messages.length-1].id
    return {
      ...state,
      messages: [...state.messages, {id: lastMessageId+1, user_name: "Me", text: state.newMessageText}],
      newMessageText: ""
    }
  } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
    return {
      ...state,
      newMessageText: action.newText
    }
  } else {
    return state
  }
}


export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextActionCreator = text => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newText: text}
)

export default messagesReducer