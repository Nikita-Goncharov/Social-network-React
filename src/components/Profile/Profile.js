import styles from './Profile.module.css'
import PostsContainer from "./Posts/PostsContainer";
import AnonProfileImg from "../common/AnonProfileImg/AnonProfileImg";
import {NavLink} from "react-router-dom";

const ProfileInfo = (props) => {
  return (
      <div className={styles.profile_info}>
        <div className={styles.profile_img}>
          {
            props.profile_data.img ?
              <img src={props.profile_data.img} width="300" alt="Profile img"/>
              :
              <AnonProfileImg />
          }
        </div>
        <div className={styles.profile_desc}>
          <h2>{props.profile_data.user.username}</h2>
          <p>Email: {props.profile_data.user.email}</p>
          <p>Status: {props.profile_data.status}</p>
          <h3>Date of birth: {props.profile_data.birth_date}</h3>
          <h3>City: {props.profile_data.city}</h3>
          <h3>Education: {props.profile_data.education}</h3>
          <h3>Web Site: <NavLink to={props.profile_data.web_site}>{props.profile_data.web_site}</NavLink></h3>
        </div>
      </div>
  )
}

const Profile = ({startDialog, error, profile_data, profileIsOwn}) => {
  return (  // TODO: more info with exception
      <div className={styles.profile}>
        {
          error.isRaised ?
          <p style={{backgroundColor: "red", color: "#fff"}}>{error.message}</p>
            :
          <>
            <ProfileInfo profile_data={profile_data}/>
            {!profileIsOwn && <button onClick={() => startDialog(profile_data.id)} className={styles.dialog_button}>Start dialog</button>} {/*TODO: change position*/}
            <PostsContainer profileIsOwn={profileIsOwn} />
          </>
        }
      </div>
  )
}

export default Profile
