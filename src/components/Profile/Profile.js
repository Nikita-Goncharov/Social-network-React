import styles from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const ProfileInfo = () => {
  return (
      <div className={styles.profile_info}>
        <div className={styles.profile_img}>
          <img src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" alt=""/>
        </div>
        <div className={styles.profile_desc}>
          <h3>Date of birth: </h3>
          <h3>City: </h3>
          <h3>Education: </h3>
          <h3>Web Site: </h3>
        </div>
      </div>
  )
}

const Profile = () => {
  return (
      <div className={styles.profile}>
        <div className={styles.poster}>
          <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt=""/>
        </div>
        <ProfileInfo />
        <MyPostsContainer className={styles.posts} />
      </div>
  )
}

export default Profile
