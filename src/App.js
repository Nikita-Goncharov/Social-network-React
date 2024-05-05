import './App.css';
import NavBar from './components/NavBar/NavBar'
import MainContent from "./components/MainContent/MainContent";
import {BrowserRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";

function App() {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavBar />
        <MainContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
