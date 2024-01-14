import React from "react";
import Post from "./Post/Post"

const MyPosts = ({newPostText, posts, addPost, changeNewPostText}) => {
  let addPostCallback = () => {
    addPost()
  }

  let changeNewPostTextCallback = (e) => {
    changeNewPostText(e.target.value)
  }

  return (
      <div>
        <h3>My posts</h3>
        <div>
          <h2>New post</h2>
          <textarea onChange={changeNewPostTextCallback} value={newPostText} /><br/>
          <button onClick={addPostCallback}>Add post</button>
        </div>
        <div className="posts">
          {posts.map(({id, img_path, text}) => <Post id={id} key={id} img_path={img_path} message={text}/>)}
        </div>
      </div>
  )
}

export default MyPosts