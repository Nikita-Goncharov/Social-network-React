import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import {setProfileDataAC} from "../../redux/profileReducer";
import {connect} from "react-redux";
import customWithParams from "../common/customWithParams/customWithParams"
import {addDialogAC} from "../../redux/messagesReducer";

function ProfileAPIContainer(props) {
    useEffect(() => {
        const loadProfile = async () => {
            let profileId = props.params.profileId
            if (!profileId) {
                if (props.ownProfile.user.isAuthorized) {
                    profileId = props.ownProfile.id
                } else {
                    // TODO: error // setError({isRaised: true, message: "Error. There is no profile with that id."})
                }
            }

            let response   = await fetch(`http://localhost:8080/api/v0.2/profile?profile_id=${profileId}`)
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

                props.setProfile(user_data, profile_data)
            } else {
                // TODO: error // setError({isRaised: true, message: "Error. Can`t fetch profile."})
            }
        }
        loadProfile()
    }, [])

    let profileIsOwn
    if (props.params.profileId) {
        profileIsOwn = Number(props.ownProfile.id) === Number(props.params.profileId)
    } else {
        profileIsOwn = true
    }

    function createDialog(profileId) {
        if (props.ownProfile.user.isAuthorized) {
            fetch(
              "http://localhost:8080/api/v0.2/dialogs",
              {method: "POST", headers: {Authorization: props.ownProfile.user.token}, body: JSON.stringify({profile_id: profileId})}
            ).then(response => {
                console.log(response.status)
                if (response.status === 200) {
                    return response.json()
                } else {
                    // TODO: error
                }
            }).then(responseJSON => {
                props.addDialog(
                  responseJSON.dialog.id,
                  responseJSON.dialog.first_profile,
                  responseJSON.dialog.second_profile,
                  responseJSON.dialog.created
                )
            })
        }
    }

    return <Profile createDialog={createDialog} profile_data={props.profile} profileIsOwn={profileIsOwn}/>  // error={error}
}

const mapStateToProps = (state) => (
    {
        profile: state.profilePage.data.profile,
        ownProfile: state.ownProfile.profile
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        setProfile: (user_data, profile_data) => dispatch(setProfileDataAC(user_data, profile_data)),
        addDialog: (id, firstProfileId, secondProfileId, dateTime) => dispatch(addDialogAC(id, firstProfileId, secondProfileId, dateTime)),
    }
)

const ProfileContainerWithParams = customWithParams(ProfileAPIContainer)
const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithParams)


export default ProfileContainer