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
            <div className="container">
              <div className="col-md-6 no-padding">
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <img className="img-rounded" width="40" height="40" src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="GitFun Icon"/>
                  <h2>
                    <a href="/" style={{color: 'white', marginLeft: 10}}>GitFun</a>
                  </h2>
                </div>
              </div>
              <div className="col-md-6 no-padding" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <a title="Fork me on GitHub" style={{
                  fontSize: '40px',
                  color: 'white'
                }} href="https://github.com/antonybudianto/gitfun-web">
                  <i className="fa fa-github"></i>
                </a>
                <a title="Get it on Google Play" href='https://play.google.com/store/apps/details?id=com.antonybudianto.gitfun'>
                  <img width="120" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
              </div>
            </div>

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
        <div className="col-md-12 App-footer text-center">
          &copy; 2017. <a href="https://antonybudianto.com">Antony Budianto</a>
        </div>
      </div>
    );
  }
}
