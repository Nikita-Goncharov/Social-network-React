import React, {useEffect} from "react";
import Profile from "./Profile";
import {getProfileThunkCreator} from "../../redux/profileReducer";
import {connect} from "react-redux";
import customWithParams from "../common/customWithParams/customWithParams"
import {createDialogThunkCreator} from "../../redux/messagesReducer";

function ProfileAPIContainer(props) {
  useEffect(() => {
    let profileId = props.params.profileId
    if (!profileId) {
      if (props.ownProfile.user.isAuthorized) {
        profileId = props.ownProfile.id
      } else {
        // TODO: error // setError({isRaised: true, message: "Error. There is no profile with that id."})
      }
    }
    props.getProfile(profileId)
  }, [])

  let profileIsOwn
  if (props.params.profileId) {
    profileIsOwn = Number(props.ownProfile.id) === Number(props.params.profileId)
  } else {
    profileIsOwn = true
  }

  const createDialog = () => props.createDialog(props.profile.id, props.ownProfile.user.isAuthorized, props.ownProfile.user.token)

  return <Profile
    error={props.profile_error}
    createDialog={createDialog}
    profile_data={props.profile}
    profileIsOwn={profileIsOwn}
  />
}

const mapStateToProps = (state) => (
  {
    profile: state.profilePage.data.profile,
    profile_loading: state.profilePage.loading,
    profile_error: state.profilePage.error,
    ownProfile: state.ownProfile.profile
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    getProfile: (profileId) => dispatch(getProfileThunkCreator(profileId)),
    createDialog: (profileId, isAuthorized, token) => dispatch(createDialogThunkCreator(profileId, isAuthorized, token)),
  }
)

const ProfileContainerWithParams = customWithParams(ProfileAPIContainer)
const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithParams)


export default ProfileContainer
