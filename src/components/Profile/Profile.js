import styles from './Profile.module.css'
import PostsContainer from "./Posts/PostsContainer";
import AnonProfileImg from "../common/AnonProfileImg/AnonProfileImg";

const ProfileInfo = (props) => {
  return (
      <div className={styles.profile_info}>
        <div className={styles.profile_img}>
          {
            props.profile_data.img ?
              <img src={props.profile_data.img} width="300" alt="ProfileItem img"/>
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
          <h3>Web Site: {props.profile_data.web_site}</h3>
        </div>
      </div>
  )
}

const Profile = ({profile_data, profileIsOwn}) => {
  return (
      <div className={styles.profile}>
        <div className={styles.poster}>
          <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt=""/>
        </div>
        <ProfileInfo profile_data={profile_data}/>
        <PostsContainer className={styles.posts} profileIsOwn={profileIsOwn} />
      </div>
  )
}

export default Profile
