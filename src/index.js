import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import App from './App.js';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
  		<App />
	</Router>,
  document.getElementById('root')
);