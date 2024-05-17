import React from "react";
import Post from "./Post/Post"

const Posts = ({newPostTitle, newPostText, posts, addPost, changeNewPostText, changeNewPostTitle, profileIsOwn}) => {
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
      <div>
        <h3>Posts</h3>
        {
          profileIsOwn
          &&
          <div>
            <h2>New post</h2>
            <input onChange={changeNewPostTitleCallback} value={newPostTitle} type="text"/><br/>
            <textarea onChange={changeNewPostTextCallback} value={newPostText}/><br/>
            <button onClick={addPostCallback}>Add post</button>
          </div>
        }
        <div className="posts">
          {posts.map(({id, img_path, title, text}) => <Post id={id} key={id} img_path={img_path} title={title}
                                                            message={text}/>)}
        </div>
      </div>
  )
}

export default Posts