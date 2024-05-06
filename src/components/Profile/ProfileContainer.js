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
                const user_data = {
                    profile_id: responseJSON.profile.user.id,
                    username: responseJSON.profile.user.username,
                    email: responseJSON.profile.user.email
                }
                const profile_data = {
                    profile_id: responseJSON.profile.id,
                    img: responseJSON.profile.img,
                    status: responseJSON.profile.status,
                    education: responseJSON.profile.education,
                    web_site: responseJSON.profile.web_site,
                    country: responseJSON.profile.country,
                    city: responseJSON.profile.city,
                    birth_date: responseJSON.profile.birth_date
                }

                this.props.updateProfile(user_data, profile_data)
            }
        })()
    }

    render() {
        return <Profile profile_data={this.props.profile}/>
    }
}

const mapStateToProps = (state) => (
    {profile: state.profilePage.profile}
)

const mapDispatchToProps = (dispatch) => (
    {updateProfile: (user_data, profile_data) => dispatch(updateProfileDataActionCreator(user_data, profile_data))}
)

const ProfileContainerWithParams = customWithRouter(ProfileAPIContainer)
const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithParams)


export default ProfileContainer