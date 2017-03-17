import React from 'react'

import './GitProfile.css';
import GitUserCard from '../../common/GitUserCard';
import GitRepo from '../GitRepo/GitRepo';

export default class GitProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.match.params.username,
      loading: true,
      user: null
    };
    this.fetchProfile(this.state.username);
  }

  fetchProfile(username) {
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

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="GitProfile col-md-6 col-md-offset-3">
            {
              this.state.loading ? <div>Loading @{this.state.username} profile...</div> : (
              !this.state.user ? <div>User not found</div> : <GitUserCard user={this.state.user}></GitUserCard>
              )
            }
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <GitRepo username={this.state.username}></GitRepo>
            <br/>
            <a href="/" className="btn btn-default">Back</a>
            <br/>
          </div>
        </div>
      </div>
    )
  }
}
