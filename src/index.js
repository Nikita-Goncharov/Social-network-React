import React from 'react';
import ReactDOM from 'react-dom/client';
// import state from "./redux/state"
import './index.css';
import App from './App';
import store from "./redux/state";
// import {addPost, changeNewPostText, subscribe} from "./redux/state";


const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderUI = (store) => {
  root.render(
      <React.StrictMode>
        <App store={store}/>
      </React.StrictMode>
  );
}

store.subscribe(rerenderUI)

rerenderUI(store)