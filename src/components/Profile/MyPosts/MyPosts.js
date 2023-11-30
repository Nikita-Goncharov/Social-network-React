import React from "react";
import Post from "./Post/Post"
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/state";

const MyPosts = ({profilePage, dispatch}) => {

  let textareaAddPost = React.createRef()

  let addPostCallback = () => {
      dispatch(addPostActionCreator())
  }

  let changeNewPostTextCallback = () => {
    let text = textareaAddPost.current.value
    dispatch(updateNewPostTextActionCreator(text))
  }

  return (
      <div>
        <h3>My posts</h3>
        <div>
          <h2>New post</h2>
          <textarea ref={textareaAddPost} onChange={changeNewPostTextCallback} value={profilePage.newPostText} /><br/>
          <button onClick={addPostCallback}>Add post</button>
        </div>
        <div className="posts">
          {profilePage.posts.map(({id, img_path, text}) => <Post id={id} img_path={img_path} message={text}/>)}
        </div>
      </div>
  )
}

export default MyPosts