import styles from './App.module.css';
import {NavBar} from './components/NavBar/NavBar'
import MainContentContainer from "./components/MainContent/MainContent";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <Header/>
        <NavBar/>
        <MainContentContainer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
