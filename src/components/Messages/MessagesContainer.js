import Messages from "./Messages";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/messagesReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    dialogs: state.messagePage.dialogs,
    messages: state.messagePage.messages,
    newMessageText: state.messagePage.newMessageText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => dispatch(sendMessageActionCreator()),
    updateNewMessageText: (text) => dispatch(updateNewMessageTextActionCreator(text))
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)

export default MessagesContainer