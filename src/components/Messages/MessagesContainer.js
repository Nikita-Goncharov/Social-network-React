import Messages from "./Messages";
import {addMessageAC, addDialogAC, updateNewMessageTextAC} from "../../redux/messagesReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import {useCookies} from "react-cookie";


const MessagesAPIContainer = (props) => {
  const [cookies, setCookie] = useCookies()
  const userAuthToken = cookies["Authorization"]
  useEffect(() => {

    async function loadDialogs() {
      const responseGETDialogs = await fetch(
        "http://localhost:8080/api/v0.2/dialogs?page=1&count=10",  // TODO: do pagination
        {headers: {Authorization: userAuthToken}}
      )
      if (responseGETDialogs.status === 200) {
        const responseDialogsJSON = await responseGETDialogs.json()
        for (const dialog of responseDialogsJSON.dialogs) {
          props.addDialog(
            dialog.id,
            dialog.first_profile,
            dialog.second_profile,
            dialog.created,
          )
          const responseGETMessages = await fetch(
            `http://localhost:8080/api/v0.2/messages?page=1&count=10&dialog_id=${dialog.id}`,  // TODO: do pagination
            {headers: {Authorization: userAuthToken}}
          )
          if (responseGETMessages.status === 200) {
            const responseMessagesJSON = await responseGETMessages.json()
            for (const message of responseMessagesJSON.messages) {
              props.addMessage(
                message.id,
                message.text,
                message.created,
                message.owner,
                message.dialog
              )
            }
          } else {
            // TODO: error
          }
        }
      } else {
        // TODO: error
      }
    }
    loadDialogs()
  }, [])

  const addMessageCallback = async (text, dialogId) => {
    const response = await fetch(
      "http://localhost:8080/api/v0.2/messages",
      {
        method: "POST",
        headers: {Authorization: userAuthToken},
        body: JSON.stringify({dialog_id: dialogId, text: text})
      }
    )
    if (response.status === 200) {
      const responseJSON = await response.json()
      const {id:messageId, created:dateTime, owner:ownProfileId} = responseJSON.profile_message
      console.log(responseJSON)
      props.addMessage(messageId, text, dateTime, ownProfileId, dialogId)
    } else {
      // TODO: error
    }
  }

  return <Messages {...props} addMessageCallback={addMessageCallback}/>
}


const mapStateToProps = (state) => {
  return {
    dialogs: state.messagePage.dialogs,
    newMessageText: state.messagePage.newMessageText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDialog: (id, firstProfileId, secondProfileId, dateTime) => dispatch(addDialogAC(id, firstProfileId, secondProfileId, dateTime)),
    addMessage: (id, text, dateTime, ownerProfileId, dialogId) => dispatch(addMessageAC(id, text, dateTime, ownerProfileId, dialogId)),
    updateNewMessageText: (text) => dispatch(updateNewMessageTextAC(text))
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesAPIContainer)

export default MessagesContainer