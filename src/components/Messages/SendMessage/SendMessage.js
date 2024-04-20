import React from "react";

const SendMessage = ({ sendMessage, updateNewMessageText, newMessageText }) => {
  const sendMessageCallback = () => {
    sendMessage()
  }

  const updateNewMessageTextCallback = (e) => {
    updateNewMessageText(e.target.value)
  }


  return (
      <>
        <textarea onChange={updateNewMessageTextCallback} value={newMessageText}></textarea><br/>
        <button type="button" onClick={sendMessageCallback}>Send message</button>
      </>
  )
}

export default SendMessage