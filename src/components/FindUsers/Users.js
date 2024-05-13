import styles from "./Users.module.css"
import User from "./User/User"
import Loader from "../common/Loader/Loader";


function Users(props) {
  let pagesList = []
  for (let i = 1; i <= props.pagesCount; i++) {
    pagesList.push(i)
  }
  return (
      <>
        <h2 className={styles.page_description}>Users</h2>
        <div className={styles.pagination_menu}>
          {pagesList.map(page => {
            return <span key={page} className={props.currentPage === page ? styles.activePage : styles.ordinaryPage} onClick={() => props.changeCurrentPage(page)}>{page}</span>
          })}
        </div>
        {props.isFetching && <Loader />}
        <div className={styles.users_management}>
          <div className={styles.users}>
            <ul>
              {props.profiles.map(profile => <li key={profile.id}><User profile={profile} followUser={props.followUser}/></li>)}
            </ul>
          </div>
        </div>
      </>
  )
}

export default Users