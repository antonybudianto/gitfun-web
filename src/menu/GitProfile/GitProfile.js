import React from 'react'

import './GitProfile.css';
import GitUserCard from '../../common/GitUserCard';

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
      console.log(result);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="GitProfile">Loading @{this.state.username}....</div>
      )
    } else if (!this.state.user) {
      return (
        <div className="GitProfile">User not found.</div>
      )
    }
    return (
      <div className="GitProfile col-md-4 col-md-offset-4">
        <GitUserCard user={this.state.user}></GitUserCard>
        <a href="/" className="btn btn-default">Back</a>
      </div>
    )
  }
}
