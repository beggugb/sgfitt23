import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import "react-datepicker/dist/react-datepicker.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>  
  </BrowserRouter>
);


