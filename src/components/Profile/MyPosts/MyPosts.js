import Post from "./Post/Post"

const MyPosts = () => {
  return (
      <div>
        <h3>My posts</h3>
        <div>
          <h2>New post</h2>
          <textarea></textarea><br/>
          <button>Add post</button>
        </div>
        <div className="posts">
          <Post img_path="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" message="Hello, man"/>
          <Post img_path="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" message="Hello world"/>
          <Post img_path="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" message="How are you ?"/>
          <Post img_path="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" message="Hi bro"/>
        </div>
      </div>
  )
}

export default MyPosts