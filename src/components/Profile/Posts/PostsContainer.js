import {clearPreviousPostsAC, loadPostAC, addPostAC, updateNewPostTextAC, updateNewPostTitleAC} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {useEffect} from "react";


function PostsContainerAPI(props) {
  console.log(props.profileId)
  const loadPosts = async (profileId) => {
    // TODO: pagination
    const count = 10
    const page = 1
    const response = await fetch(`http://localhost:8080/api/v0.2/posts?count=${count}&page=${page}&profile_id=${profileId}`)
    props.clearPreviousPosts()
    if (response.status === 200) {
      const responseJSON = await response.json()
      const posts = responseJSON.posts
      for (const post of posts) {
        const {id, title, description} = post
        props.loadPost(id, title, description)
      }
    } else {
      // TODO: show error
    }
  }
  useEffect(() => {
    loadPosts(props.profileId)
  }, [props.profileId])  // TODO: good or not ???
  return <Posts {...props} />
}

const mapStateToProps = (state, ownProps) => {
  return {
    newPostTitle: state.profilePage.newPostTitle,
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
    profileId: state.profilePage.profile.id,
    profileIsOwn: ownProps.profileIsOwn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPost: (id, title, text) => dispatch(loadPostAC(id, title, text)),
    clearPreviousPosts: () => dispatch(clearPreviousPostsAC()),
    addPost: () => dispatch(addPostAC()),
    changeNewPostTitle: (title) => dispatch(updateNewPostTitleAC(title)),
    changeNewPostText: (text) => dispatch(updateNewPostTextAC(text))
  }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(PostsContainerAPI)

export default PostsContainer