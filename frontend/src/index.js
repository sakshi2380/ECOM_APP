import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux"
import App from './App';
import store from './store';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { CookiesProvider } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
       <AlertProvider template={AlertTemplate} {...options}>
       <CookiesProvider>
      <App />
      </CookiesProvider>
    </AlertProvider>
    
  </Provider>
  
   
  
);


