import Message from './Message/Message'
import styles from './Messages.module.css'
import {NavLink, Route, Routes} from "react-router-dom";
import SendMessage from "./SendMessage/SendMessage";
import customWithParams from "../common/customWithParams/customWithParams";


const DialogLink = (props) => {
  return (  // TODO: do name dialog with who
      <li><NavLink to={`${props.id}`}>{props.firstProfileId} - {props.secondProfileId} {props.dateTime}</NavLink></li>
  )
}

const MessagesItems = (props) => {
  const dialogId = +props.params["dialogId"]
  const dialog = props.dialogs.find(dialog => dialog.id === dialogId)
  return (
    <>
      {
        dialog.messages.length
          ?
        dialog.messages.map(({id, user_name, text}) => <Message message_user_name={user_name} message_text={text} key={id} id={id}/>)
          :
        <p>No messages yet</p>
      }
      <SendMessage  // TODO: separate from messages, when we type new message all this stuff(messages) rerender
        sendMessage={() => props.addMessageCallback(props.newMessageText, dialogId)}
        updateNewMessageText={props.updateNewMessageText}
        newMessageText={props.newMessageText}
      />
    </>
  )
}

const MessagesItemsWithParams = customWithParams(MessagesItems)

const Messages = ({ dialogs, newMessageText, addMessageCallback, updateNewMessageText }) => {
  return (
      <>
        <h2 className={styles.page_description}>Your messages</h2>
        <div className={styles.messages}>
          <div className={styles.dialogs}>
            <div className={styles.dialogs_description}><h4>Dialogs</h4></div>
            <ul className={styles.dialogs_list}>
              {dialogs.map(({id, firstProfileId, secondProfileId, dateTime}) => {
                  return (
                    <DialogLink key={id} id={id} firstProfileId={firstProfileId} secondProfileId={secondProfileId} dateTime={dateTime}/>
                  )
              })}
            </ul>
          </div>
          <div className={styles.message_bar}>
            <Routes>
              <Route path=":dialogId" element={
                <MessagesItemsWithParams
                  newMessageText={newMessageText}
                  updateNewMessageText={updateNewMessageText}
                  addMessageCallback={addMessageCallback}
                  dialogs={dialogs}
                />
              }></Route>
            </Routes>
          </div>
        </div>
      </>
  )
}

export default Messages