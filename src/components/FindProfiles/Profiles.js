import styles from "./Profiles.module.css"
import ProfileItem from "./ProfileItem/ProfileItem"
import Loader from "../common/Loader/Loader";


function Profiles(props) {
  let pagesList = []
  for (let i = 1; i <= props.pagesCount; i++) {
    pagesList.push(i)
  }
  return (
      <>
        <h2 className={styles.page_description}>Profiles</h2>
        <div className={styles.pagination_menu}>
          {pagesList.map(page => {
            return <span key={page} className={props.currentPage === page ? styles.activePage : styles.ordinaryPage} onClick={() => props.changeCurrentPage(page)}>{page}</span>
          })}
        </div>
        {
          props.error.isRaised ?
            <p style={{backgroundColor: "red", color: "#fff"}}>{props.error.message}</p>
            :
          <>
            {props.isFetching && <Loader />}
            <div className={styles.users_management}>
              <div className={styles.users}>
                <ul>
                  {props.profiles.map(profile => <li key={profile.id}><ProfileItem profile={profile} follow={props.follow}/></li>)}
                </ul>
              </div>
            </div>
          </>
        }
      </>
  )
}

export default Profiles