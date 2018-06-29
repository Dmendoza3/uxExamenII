import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM,{ render } from 'react-dom';

import {wallContainer} from '../imports/api/wall'

import App from './Container/App.jsx';



import "./main.html"

Meteor.startup(() => {
  render(<App />, document.getElementById("app"));  
});