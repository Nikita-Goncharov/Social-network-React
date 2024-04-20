import Message from './Message/Message'
import styles from './Messages.module.css'
import {NavLink} from "react-router-dom";
import SendMessage from "./SendMessage/SendMessage";


const DialogLink = (props) => {
  return (
      <li><NavLink to={props.id}>{props.name}</NavLink></li>
  )
}

const Messages = ({ dialogs, messages, newMessageText, sendMessage, updateNewMessageText }) => {
  return (
      <>
        <h2 className={styles.page_description}>Your messages</h2>
        <div className={styles.messages}>
          <div className={styles.dialogs}>
            <div className={styles.dialogs_description}><h4>Dialogs</h4></div>
            <ul className={styles.dialogs_list}>
              {dialogs.map(({id, name}) => <DialogLink name={name} key={id} id={id}/>)}
            </ul>
          </div>
          <div className={styles.message_bar}>
            {messages.map(({id, user_name, text}) => <Message message_user_name={user_name} message_text={text} key={id} id={id}/>)}
            <SendMessage sendMessage={sendMessage}
                         updateNewMessageText={updateNewMessageText}
                         newMessageText={newMessageText}
            />
          </div>
        </div>
      </>
  )
}

export default Messages