const ADD_MESSAGE = "ADD-MESSAGE"
const ADD_DIALOG = "ADD-DIALOG"
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"


const initialState = {
  dialogs: [], // {id, firstProfileId, secondProfileId, dateTime, messages: [{}]}
  newMessageText: ""
}


const messagesReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const dialogForAddMessage = state.dialogs.find(dialog => dialog.id === action.dialogId)
      state.dialogs = state.dialogs.filter(dialog => dialog.id !== action.dialogId)
      dialogForAddMessage.messages = [
        ...dialogForAddMessage.messages,
        {id: action.id, text: action.text, dateTime: action.dateTime, ownerProfileId: action.ownerProfileId, dialogId: action.dialogId}
      ]
      return {
        ...state,
        dialogs: [...state.dialogs, dialogForAddMessage],
        newMessageText: ""
      }
    case ADD_DIALOG:
      return {
        ...state,
        dialogs: [...state.dialogs, {
          id: action.id,
          firstProfileId: action.firstProfileId,
          secondProfileId: action.secondProfileId,
          dateTime: action.dateTime,
          messages: []
        }]
      }
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.text
      }
    default:
      return state
  }
}


export const addMessageAC = (id, text, dateTime, ownerProfileId, dialogId) => (
  {type: ADD_MESSAGE, id, text, dateTime, ownerProfileId, dialogId}
)

export const addDialogAC = (id, firstProfileId, secondProfileId, dateTime) => ({
  type: ADD_DIALOG, id, firstProfileId, secondProfileId, dateTime
})
// TODO: removeDialogAC
export const updateNewMessageTextAC = text => (
    {type: UPDATE_NEW_MESSAGE_TEXT, text}
)

export default messagesReducer