import React from "react";
import Post from "./Post/Post"
import styles from "./Posts.module.css"

const Posts = ({error, newPostTitle, newPostText, posts, addPost, changeNewPostText, changeNewPostTitle, profileIsOwn}) => {
  let addPostCallback = () => {
    addPost()
  }

  let changeNewPostTextCallback = (e) => {
    changeNewPostText(e.target.value)
  }

    let changeNewPostTitleCallback = (e) => {
        changeNewPostTitle(e.target.value)
    }
    
  return (
    <>
      {
        profileIsOwn
        &&
        <div className={styles.posts_form}>
          <h2>New post</h2>
          <input placeholder="Post title" onChange={changeNewPostTitleCallback} value={newPostTitle} type="text"/><br/>
          <textarea placeholder="Post description" onChange={changeNewPostTextCallback} value={newPostText}/><br/>
          <button onClick={addPostCallback}>Add post</button>
        </div>
      }
      <div className={styles.posts}>
        <h3>Posts</h3>
        {
          error.isRaised ?
            <p style={{backgroundColor: "red", color: "#fff"}}>{error.message}</p>
            :
            posts.map(({id, img_path, title, text}) => <Post id={id} key={id} img_path={img_path} title={title} message={text}/>)
        }
      </div>
    </>
  )
}

export default Posts