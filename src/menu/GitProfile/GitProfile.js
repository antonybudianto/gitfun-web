import React from 'react';
import {
  Link
} from 'react-router-dom';

import './GitProfile.css';
import GitUserCard from '../../common/GitUserCard';
import GitRepo from '../GitRepo/GitRepo';
import GitFollower from '../GitFollower/GitFollower';

export default class GitProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.match.params.username,
      loading: true,
      user: null,
      tab: 'repo'
    };
  }
  componentWillReceiveProps(props) {
    if (this.state.username === props.match.params.username) {
      return;
    }

    this.setState({
      username: props.match.params.username,
      user: null,
      tab: 'repo'
    }, () => this.fetchProfile(this.state.username));
  }

  componentDidMount() {
    this.fetchProfile(this.state.username);
  }

  fetchProfile(username) {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(result => {
      if (!result.login) {
        return this.setState({
          loading: false
        });
      }

      this.setState({
        loading: false,
        user: result
      });
    });
  }

  switchTab(tabName) {
    this.setState({
      tab: tabName
    });
  }

  isTabActive(tabName) {
    return this.state.tab === tabName ? 'active' : '';
  }

  render() {
    return (
      <div className="row">
        <div>
          <ol className="breadcrumb text-center">
            <li><Link to="/">Home</Link></li>
            <li>Profile</li>
          </ol>
        </div>
        <div className="GitProfile text-center col-md-8 col-md-offset-2">
          {
            this.state.loading ? <div><i className="fa fa-spin fa-spinner"></i> Loading @{this.state.username} profile...</div> : (
            !this.state.user ? <div>User not found</div> : <GitUserCard user={this.state.user}></GitUserCard>
            )
          }
        </div>
        <div>
          <div className="col-md-8 col-md-offset-2">
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className={this.isTabActive('repo')}>
                  <a onClick={this.switchTab.bind(this, 'repo')} href="#" aria-controls="repo" role="tab" data-toggle="tab"><i className="fa fa-book"></i> Repositories</a></li>
                <li role="presentation" className={this.isTabActive('followers')}>
                  <a onClick={this.switchTab.bind(this, 'followers')} href="#" aria-controls="followers" role="tab" data-toggle="tab"><i className="fa fa-users"></i> Followers</a></li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className={'tab-pane '+this.isTabActive('repo')} id="repo">
                  <GitRepo username={this.state.username}></GitRepo>
                </div>
                <div role="tabpanel" className={'tab-pane '+this.isTabActive('followers')} id="followers">
                  <GitFollower username={this.state.username}></GitFollower>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
