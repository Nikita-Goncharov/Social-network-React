import React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/state";

const SendMessage = ({dispatch, newMessageText}) => {
  let textareaMessage = React.createRef()

  const sendMessageCallback = () => {
    dispatch(sendMessageActionCreator())
  }

  const updateNewMessageTextCallback = () => {
    let text = textareaMessage.current.value
    dispatch(updateNewMessageTextActionCreator(text))
  }

  return (
      <>
        <textarea ref={textareaMessage} onChange={updateNewMessageTextCallback} value={newMessageText}></textarea><br/>
        <button type="button" onClick={sendMessageCallback}>Send message</button>
      </>
  )
}

export default SendMessage