import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import {updateProfileDataAC} from "../../redux/profileReducer";
import {connect} from "react-redux";
import customWithParams from "../common/customWithParams/customWithParams"

function ProfileAPIContainer(props) {
    const [error, setError] = useState({isRaised: false, message: ""})

    useEffect(() => {
        let profileId = props.params.profileId
        if (!profileId) {
            if (props.ownProfile.user.isAuthorized) {
                profileId = props.ownProfile.id
            } else {
                setError({isRaised: true, message: "Error. There is no profile with that id."})
            }
        }
        const loadProfile = async () => {
            let response  = await fetch(`http://localhost:8080/api/v0.2/profile?profile_id=${profileId}`)
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

                props.updateProfile(user_data, profile_data)
            } else {
                setError({isRaised: true, message: "Error. Can`t fetch profile."})
            }
        }
        if (!error.isRaised) {
            loadProfile()
        }
    }, [])


    let profileIsOwn
    if (props.params.profileId) {
        profileIsOwn = Number(props.ownProfile.id) === Number(props.params.profileId)
    } else {
        profileIsOwn = true
    }
    return <Profile error={error} profile_data={props.profile} profileIsOwn={profileIsOwn}/>
}

const mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile,
        ownProfile: state.ownProfile.profile
    }
)

const mapDispatchToProps = (dispatch) => (
    {updateProfile: (user_data, profile_data) => dispatch(updateProfileDataAC(user_data, profile_data))}
)

const ProfileContainerWithParams = customWithParams(ProfileAPIContainer)
const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithParams)


export default ProfileContainer