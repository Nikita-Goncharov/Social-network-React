import styles from "./Post.module.css"

const Post = (props) => {
  return (
      <div className={styles.post}>
        <img src={props.img_path} alt=""/>
        <span>{props.message}</span>
      </div>
  )
}

export default Post