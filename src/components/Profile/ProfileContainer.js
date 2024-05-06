import React from "react";
import Profile from "./Profile";
import {updateProfileDataActionCreator} from "../../redux/profileReducer";
import {connect} from "react-redux";
import customWithRouter from "../common/customWithRouter/customWithRouter"

class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = 30  // TODO: get profile by auth token
        }
        (async () => {
            let response  = await fetch(`http://localhost:8080/api/v0.2/profile?profile_id=${userId}`)
            if (response.status === 200) {
                let responseJSON = await response.json()
                let profile_data = responseJSON.profile
                this.props.updateProfile(profile_data)
            }
        })()
    }

    render() {
        return <Profile profile_data={this.props.profile}/>
    }
}

const mapStateToProps = (state) => (
    {profile: state.profilePage}
)

const mapDispatchToProps = (dispatch) => (
    {updateProfile: new_profile_data => dispatch(updateProfileDataActionCreator(new_profile_data))}
)

const ProfileContainerWithParams = customWithRouter(ProfileAPIContainer)
const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithParams)


export default ProfileContainer