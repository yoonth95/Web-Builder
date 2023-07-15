import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import 'styles/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router />,
  // <React.StrictMode>
  // </React.StrictMode>,
);
