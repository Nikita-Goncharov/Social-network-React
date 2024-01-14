import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./redux/redux_store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
// const rerenderUI = (store) => {
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
)
// }


// // Because redux subscribe() call our function without params when state changed
// store.subscribe(() => rerenderUI(store))
//
// rerenderUI(store)