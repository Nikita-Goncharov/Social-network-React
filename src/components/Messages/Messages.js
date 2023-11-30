import Message from './Message/Message'
import styles from './Messages.module.css'
import {NavLink} from "react-router-dom";
import SendMessage from "./SendMessage/SendMessage";


const DialogLink = (props) => {
  return (
      <li><NavLink to={props.id}>{props.name}</NavLink></li>
  )
}

const Messages = ({messagePage, dispatch}) => {



  return (
      <>
        <h2 className={styles.page_description}>Your messages</h2>
        <div className={styles.messages}>
          <div className={styles.dialogs}>
            <div className={styles.dialogs_description}><h4>Dialogs</h4></div>
            <ul className={styles.dialogs_list}>
              {messagePage.dialogs.map(({id, name}) => <DialogLink name={name} id={id}/>)}
            </ul>
          </div>
          <div className={styles.message_bar}>
            {messagePage.messages.map(({id, user_name, text}) => <Message message_user_name={user_name} message_text={text} id={id}/>)}
            <SendMessage dispatch={dispatch} newMessageText={messagePage.newMessageText} />
          </div>
        </div>
      </>
  )
}

export default Messages