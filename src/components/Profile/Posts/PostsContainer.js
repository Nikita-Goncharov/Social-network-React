import {
  createPostThunkCreator,
  loadPostsThunkCreator,
  updateNewPostTextAC,
  updateNewPostTitleAC
} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {useEffect} from "react";


function PostsContainerAPI(props) {
  useEffect(() => {
    props.loadPosts(props.profileId)
  }, [props.profileId])
  
  return <Posts error={props.posts_error} addPostCallback={props.createPost} {...props} />
}

const mapStateToProps = (state, ownProps) => {
  return {
    newPostTitle: state.profilePage.inputData.newPostTitle,
    newPostText: state.profilePage.inputData.newPostText,

    posts_error: state.profilePage.error,
    posts_loading: state.profilePage.loading,
    posts: state.profilePage.data.posts,

    profileId: state.profilePage.data.profile.id,
    ownProfile: state.ownProfile.profile,
    profileIsOwn: ownProps.profileIsOwn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: (profileId) => dispatch(loadPostsThunkCreator(profileId)),
    createPost: (title, text, token) => dispatch(createPostThunkCreator(title, text, token)),
    changeNewPostTitle: (title) => dispatch(updateNewPostTitleAC(title)),
    changeNewPostText: (text) => dispatch(updateNewPostTextAC(text))
  }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(PostsContainerAPI)

export default PostsContainer
