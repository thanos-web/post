import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppPost from './сomponents/app';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppPost/>
  </BrowserRouter>
);