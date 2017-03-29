import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './App.css';
import GitMain from './menu/GitMain/GitMain';
import GitProfile from './menu/GitProfile/GitProfile';
import NotFoundPage from './error/NotFoundPage/NotFoundPage';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className="App-header col-md-12">
          <h2>
            <a href="/" style={{color: 'white'}}>GitFun</a>
          </h2>
        </div>
        <div className="col-md-12">
          <Router>
            <Switch>
              <Route exact path="/" component={GitMain}></Route>
              <Route path="/profile/:username" component={GitProfile}></Route>
              <Route path="*" component={NotFoundPage}></Route>
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
