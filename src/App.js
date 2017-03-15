import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './App.css';
import GitMain from './menu/GitMain/GitMain';
import GitProfile from './menu/GitProfile/GitProfile';

export default class App extends React.Component {

  render() {
    return (
      <div className="App row">
        <div className="App-header col-md-12">
          <h2>GitFun</h2>
        </div>
        <div className="col-md-12">
          <Router>
            <Switch>
              <Route exact path="/" component={GitMain}></Route>
              <Route path="/profile/:username" component={GitProfile}></Route>
            </Switch>
          </Router>
        </div>
        <div className="col-md-12 App-footer">
          Made by @antonybudianto
        </div>
      </div>
    );
  }
}
