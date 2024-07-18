import Messages from "./Messages";
import {
  updateNewMessageTextAC,
  getDialogsAndMessagesThunkCreator, createMessageThunkCreator
} from "../../redux/messagesReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import {useCookies} from "react-cookie";


const MessagesAPIContainer = (props) => {
  const [cookies, setCookie] = useCookies()
  const userAuthToken = cookies["Authorization"]

  useEffect(() => {
    props.getDialogsAndMessagesThunk(userAuthToken)
  }, [])

  const addMessageCallback = async (text, dialogId) => {
    props.createMessageThunk(userAuthToken, text, dialogId)
  }

  return <Messages {...props} addMessageCallback={addMessageCallback}/>
}


const mapStateToProps = (state) => {
  return {
    dialogs: state.messagePage.data.dialogs,
    newMessageText: state.messagePage.inputData.newMessageText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDialogsAndMessagesThunk: (token) => dispatch(getDialogsAndMessagesThunkCreator(token)),
    createMessageThunk: (token, text, dialogId) => dispatch(createMessageThunkCreator(token, text, dialogId)),
    updateNewMessageText: (text) => dispatch(updateNewMessageTextAC(text))
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesAPIContainer)

export default MessagesContainer