import styles from "./ProfileItem.module.css"
import {NavLink} from "react-router-dom"
import AnonProfileImg from "../../common/AnonProfileImg/AnonProfileImg"
import {RenderIfAuthorized} from "../../common/RenderIfAuthorized/RenderIfAuthorized";

function ProfileItem(props) {
  return (
      <div className={styles.profile_item}>
        <NavLink to={"/profile/" + props.profile.id}>
            <div className={styles.profile_img}>
              {
                props.profile.img ?
                  <img src={props.profile.img} alt="Profile Item img"/>
                  :
                  <AnonProfileImg />
              }
            </div>

          <div className={styles.profile_data}>
            <h3>Username: {props.profile.user.username}</h3>
            <p>Email: {props.profile.user.email}</p>
            {props.profile.country ? <h3>Country: {props.profile.country}</h3> : <></>}
            {props.profile.city ? <h3>City: {props.profile.city}</h3> : <></>}
          </div>
        </NavLink>
        <div>
          <RenderIfAuthorized
            render={
              <button className={styles.profile_follow_button} onClick={() => props.followUnfollowProfile(props.profile.id, props.profile.followed)}>
                {props.profile.followed ? "Unfollow" : "Follow"}
              </button>
            }
          />
        </div>
      </div>
  )
}

export default ProfileItem