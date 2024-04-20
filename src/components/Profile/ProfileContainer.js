import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {updateProfileDataActionCreator} from "../../redux/profileReducer";
import {connect} from "react-redux";
import customWithRouter from "../common/customWithRouter/customWithRouter"

class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = 30  // TODO: get profile by auth token
        }
        axios.get(`http://localhost:8080/api/v0.2/profile?profile_id=${userId}`).then(response => {
            if (response.status === 200) {
                 // id, education, web_site, birth_date, user(id)
                 let profile_data = response.data.profile
                 this.props.updateProfile(profile_data)
                 // this.props.setCurrentProfile()
            }
        })
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