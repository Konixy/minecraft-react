import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import '@south-paw/typeface-minecraft';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
