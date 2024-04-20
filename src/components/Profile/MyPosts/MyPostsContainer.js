import {addPostActionCreator, updateNewPostTextActionCreator, updateNewPostTitleActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    newPostTitle: state.profilePage.newPostTitle,
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => dispatch(addPostActionCreator()),
    changeNewPostTitle: (title) => dispatch(updateNewPostTitleActionCreator(title)),
    changeNewPostText: (text) => dispatch(updateNewPostTextActionCreator(text))
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer