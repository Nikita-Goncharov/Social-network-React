import styles from "./Post.module.css"

const Post = (props) => {
  return (
      <div className={styles.post}>
        <img src={props.img_path} alt=""/>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </div>
  )
}

export default Post