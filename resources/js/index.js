import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./src/Routes";
import './src/assets/app.css';

if (document.getElementById('app')) {
    ReactDOM.render(<Routes />, document.getElementById('app'));
}
