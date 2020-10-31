import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Modal from 'react-modal';

document.addEventListener("DOMContentLoaded", () => {
  Modal.setAppElement('#root');
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});