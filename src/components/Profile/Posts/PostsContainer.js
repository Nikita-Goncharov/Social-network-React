import {addPostAC, updateNewPostTextAC, updateNewPostTitleAC} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    newPostTitle: state.profilePage.newPostTitle,
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
    profileIsOwn: ownProps.profileIsOwn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => dispatch(addPostAC()),
    changeNewPostTitle: (title) => dispatch(updateNewPostTitleAC(title)),
    changeNewPostText: (text) => dispatch(updateNewPostTextAC(text))
  }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)

export default PostsContainer