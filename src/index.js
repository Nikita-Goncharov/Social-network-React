import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppContainer from "./AppContainer";
import store from "./redux/redux_store";
import {Provider} from "react-redux";
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
    <CookiesProvider defaultSetOptions={{path: '/'}}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </CookiesProvider>
    </React.StrictMode>
)

window.store = store