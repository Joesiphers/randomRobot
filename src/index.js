import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './components/store/store';

ReactDOM.render(
  <React.StrictMode>
    <header><p className="center">Have fun with this randon Robot </p></header>
       <Provider store={store} ><App /></Provider>
<footer><p className="center">by Wenguang Zhou, joed@163.com<br/> for a robot challenge
<br/></p></footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
