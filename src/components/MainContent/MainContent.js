import Profile from "../Profile/Profile"
import Messages from "../Messages/Messages"
import styles from './MainContent.module.css'
import {Route, Routes} from 'react-router-dom'
import Home from "../Home/Home"
import Settings from "../Settings/Settings"
import Page404 from "../ErrorPages/Page404"


const MainContent = ({store}) => {
  return (
      <div className={styles.main_content}>
        <Routes>
          <Route element={<Home />} path=""/>
          <Route element={<Home />} path="/home"/>
          <Route element={<Profile profilePage={store.getState().profilePage} dispatch={store.dispatch.bind(store)} />} path="/profile"/>
          <Route element={<Settings />} path="/settings"/>
          <Route element={<Messages messagePage={store.getState().messagePage} dispatch={store.dispatch.bind(store)}/>} path="/messages"/>
          <Route element={<Page404 />} path="*"/>
        </Routes>
      </div>
  )
}

export default MainContent