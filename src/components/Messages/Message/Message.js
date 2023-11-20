import styles from './Message.module.css'
const Message = (props) => {
  return (
      <div className={styles.message}>
        <div className={styles.message_icon}>
          <img className="" src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" alt=""/>
        </div>
        <div className="message_text">
          <h3>{props.message_user_name}</h3>
          <p>{props.message_text}</p>
        </div>
      </div>
  )
}

export default Message