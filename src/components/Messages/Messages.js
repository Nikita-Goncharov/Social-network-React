import Message from './Message/Message'
import styles from './Messages.module.css'
import {NavLink} from "react-router-dom";


const DialogLink = (props) => {
  return (
      <li><NavLink to={props.id}>{props.name}</NavLink></li>
  )
}

const Messages = () => {
  const basic_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Nam arcu velit, dapibus vitae pretium vitae, hendrerit a dolor. Mauris eget dictum arcu. 
  Aenean facilisis aliquam purus.
  Pellentesque pulvinar, est at blandit egestas, nibh turpis scelerisque ex, nec feugiat ipsum est non tortor. 
  Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vehicula tortor id ipsum elementum tempus.`

  let dialogs = [
    {id: "1", name: "Andrew"},
    {id: "2", name: "Dmitry"},
    {id: "3", name: "Sasha"},
    {id: "4", name: "Sveta"},
    {id: "5", name: "Victor"},
  ]

  let messages = [
    {id: "1", user_name: "Dmitry", text: basic_text},
    {id: "2", user_name: "Dmitry", text: basic_text},
    {id: "3", user_name: "Me", text: basic_text},
    {id: "4", user_name: "Dmitry", text: basic_text},
    {id: "5", user_name: "Me", text: basic_text},
  ]


  return (
      <>
        <h2 className={styles.page_description}>Your messages</h2>
        <div className={styles.messages}>
          <div className={styles.dialogs}>
            <div className={styles.dialogs_description}><h4>Dialogs</h4></div>
            <ul className={styles.dialogs_list}>
              {dialogs.map(({id, name}) => <DialogLink name={name} id={id}/>)}
            </ul>
          </div>
          <div className={styles.message_bar}>
            {messages.map(({id, user_name, text}) => <Message message_user_name={user_name} message_text={text} id={id}/>)}
          </div>
        </div>
      </>
  )
}

export default Messages