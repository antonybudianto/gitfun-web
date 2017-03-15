import React from 'react';

import './GitRepo.css';
import GitRepoCard from '../../common/GitRepoCard';

export default class GitRepo extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      loading: true,
      username: props.username,
      repos: []
    };

    this.fetchRepo(this.state.username);
  }

  fetchRepo(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      this.setState({
        loading: false,
        repos: result
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading @{this.state.username} repos...</div>
      );
    }
    return (
      <div>
        {
          this.state.repos.length === 0 ?
            <div>@{this.state.username} have zero repo</div> :
          this.state.repos
          .filter(repo => !repo.fork)
          .map(repo =>
            <GitRepoCard key={repo.id} repo={repo}></GitRepoCard>
          )
        }
      </div>
    )
  }
}
