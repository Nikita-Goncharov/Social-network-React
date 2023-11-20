import './App.css';
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import MainContent from "./components/MainContent/MainContent";
import {BrowserRouter} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <NavBar />
        <MainContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
