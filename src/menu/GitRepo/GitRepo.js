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
    } else if (this.state.repos.length === 0) {
      return (
        <div>@{this.state.username} have zero repo</div>
      );
    }

    const repos = this.state.repos
      .filter(repo => !repo.fork);
    const totalStars = repos.reduce((acc, cur) => acc + cur['stargazers_count'], 0);
    const totalForks = repos.reduce((acc, cur) => acc + cur['forks'], 0);
    const totalOpenIssues = repos.reduce((acc, cur) => acc + cur['open_issues'], 0);

    return (
      <div className="row">
        <h3>Repo summary</h3>
        <h4 title="stars"><strong>{totalStars}</strong> <i className="fa fa-star"></i></h4>
        <h4 title="forks"><strong>{totalForks}</strong> <i className="fa fa-code-fork"></i></h4>
        <h4><strong>{totalOpenIssues}</strong> open issues</h4>
        <br/>
        {
          repos
          .filter(repo => !repo.fork)
          .map(repo =>
            <div className="col-md-4" key={repo.id}>
              <GitRepoCard key={repo.id} repo={repo}></GitRepoCard>
            </div>
          )
        }
      </div>
    )
  }
}
