import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
ReactDOM.render(
  <BrowserRouter>
  {/* 将BrowserRouter包裹App方便router之间信息传递 */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

