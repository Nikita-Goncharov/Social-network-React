const ADD_MESSAGE = "ADD-MESSAGE"
const ADD_DIALOG = "ADD-DIALOG"
const REMOVE_DIALOG = "REMOVE-DIALOG"
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"

const LOADING_DIALOGS = "LOADING-DIALOGS"
const FAILURE_DIALOGS = "FAILURE-DIALOGS"

const LOADING_MESSAGES = "LOADING-MESSAGES"
const FAILURE_MESSAGES = "FAILURE-MESSAGES"


const initialState = {
  inputData: {
    newMessageText: ""
  },
  data: {
    dialogs: []  // {id, firstProfileId, secondProfileId, dateTime, messages: [{}]}
  },
  loading: false,
  error: null
}


const messagesReducer = (state = initialState, action) => {
  let dialogsWithoutMessages

  switch (action.type) {
    case ADD_MESSAGE:
      const dialogForAddMessage = state.data.dialogs.find(dialog => dialog.id === action.dialogId)
      state.dialogs = state.data.dialogs.filter(dialog => dialog.id !== action.dialogId)
      dialogForAddMessage.messages = [
        ...dialogForAddMessage.messages,
        {
          id: action.id,
          text: action.text,
          dateTime: action.dateTime,
          ownerProfileId: action.ownerProfileId,
          dialogId: action.dialogId
        }
      ]
      return {
        ...state,
        data: {
          ...state.data,
          dialogs: [...state.dialogs, dialogForAddMessage],
        },
        inputData: {
          newMessageText: ""
        }
      }
    case ADD_DIALOG:
      return {
        ...state,
        data: {
          ...state.data,
          dialogs: [...state.data.dialogs, {
            id: action.id,
            firstProfileId: action.firstProfileId,
            secondProfileId: action.secondProfileId,
            dateTime: action.dateTime,
            messages: []
          }]
        }
      }
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        inputData: {
          newMessageText: action.text
        }
      }
    case LOADING_DIALOGS:
      return {
        ...state,
        data: {
          dialogs: []
        },
        loading: true,
        error: null
      }
    case FAILURE_DIALOGS:
      return {
        ...state,
        data: {
          dialogs: []
        },
        loading: false,
        error: new Error(action.message)
      }
    case LOADING_MESSAGES:
      dialogsWithoutMessages = state.data.dialogs.map(dialog => {
        dialog.messages = []
        return dialog
      })
      return {
        ...state,
        data: {
          dialogs: dialogsWithoutMessages
        },
        loading: true,
        error: null
      }
    case FAILURE_MESSAGES:
      dialogsWithoutMessages = state.data.dialogs.map(dialog => {
        dialog.messages = []
        return dialog
      })
      return {
        ...state,
        data: {
          dialogs: dialogsWithoutMessages
        },
        loading: false,
        error: new Error(action.message)
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

export const removeDialogAC = (id) => ({
  type: REMOVE_DIALOG, id
})

export const updateNewMessageTextAC = text => (
  {type: UPDATE_NEW_MESSAGE_TEXT, text}
)

export const loadingDialogsAC = () => ({type: LOADING_DIALOGS})
export const failureDialogsAC = () => ({type: FAILURE_DIALOGS})
export const loadingMessagesAC = () => ({type: LOADING_MESSAGES})
export const failureMessagesAC = () => ({type: FAILURE_MESSAGES})

export const getDialogsAndMessagesThunkCreator = (token) => async (dispatch) => {
  dispatch(loadingDialogsAC())
  const responseGETDialogs = await fetch(
    "http://localhost:8080/api/v0.2/dialogs?page=1&count=10",  // TODO: do pagination
    {headers: {Authorization: token}}
  )
  if (responseGETDialogs.status === 200) {
    const responseDialogsJSON = await responseGETDialogs.json()
    for (const dialog of responseDialogsJSON.dialogs) {
      dispatch(addDialogAC(
        dialog.id,
        dialog.first_profile,
        dialog.second_profile,
        dialog.created,
      ))
      dispatch(loadingMessagesAC())
      const responseGETMessages = await fetch(
        `http://localhost:8080/api/v0.2/messages?page=1&count=10&dialog_id=${dialog.id}`,  // TODO: do pagination
        {headers: {Authorization: token}}
      )
      if (responseGETMessages.status === 200) {
        const responseMessagesJSON = await responseGETMessages.json()
        for (const message of responseMessagesJSON.messages) {
          dispatch(addMessageAC(
            message.id,
            message.text,
            message.created,
            message.owner,
            message.dialog
          ))
        }
      } else {
        dispatch(failureMessagesAC("Error. Can`t get messages."))
      }
    }
  } else {
    dispatch(failureDialogsAC("Error. Can`t get dialogs."))
  }
}

export const createMessageThunkCreator = (token, text, dialogId) => async (dispatch) => {
  // dispatch(loadingMessagesAC())
  const response = await fetch(
    "http://localhost:8080/api/v0.2/messages",
    {
      method: "POST",
      headers: {Authorization: token},
      body: JSON.stringify({dialog_id: dialogId, text: text})
    }
  )
  if (response.status === 200) {
    const responseJSON = await response.json()
    const {id: messageId, created: dateTime, owner: ownProfileId} = responseJSON.profile_message
    dispatch(addMessageAC(messageId, text, dateTime, ownProfileId, dialogId))
  } else {
    // dispatch(failureMessagesAC())
  }
}

export const createDialogThunkCreator = (profileId, isAuthorized, token) => async (dispatch) => {
  // dispatch(loadingMessagesAC())
  if (isAuthorized) {
    const response = await fetch(
      "http://localhost:8080/api/v0.2/dialogs",
      {
        method: "POST",
        headers: {Authorization: token},
        body: JSON.stringify({profile_id: profileId})
      })
    if (response.status === 200) {
      const responseJSON = await response.json()
      dispatch(addDialogAC(
        responseJSON.dialog.id,
        responseJSON.dialog.first_profile,
        responseJSON.dialog.second_profile,
        responseJSON.dialog.created
      ))
    } else {
      dispatch(failureMessagesAC("Error. Can`t create dialog"))
    }
  }
}

export default messagesReducer
