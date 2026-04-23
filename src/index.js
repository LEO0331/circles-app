/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './App.css';
import { registerServiceWorker } from './serviceWorkerRegistration';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
