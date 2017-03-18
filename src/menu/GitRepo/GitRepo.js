import React from 'react';

import './GitRepo.css';
import GitRepoCard from '../../common/GitRepoCard';
import GitStat from '../../common/GitStat';

const ActionLabel = ({children, onClick}) =>
  <span onClick={onClick} className="label label-info" style={{
    marginLeft: 2,
    marginRight: 2,
    padding: 5,
    cursor: 'pointer'
  }}>{children}</span>

const LangLabel = ({label, count, onClick}) =>
  <ActionLabel onClick={() => onClick({label, count})}>
    {label} &nbsp;<span className="badge">{count}</span>
  </ActionLabel>

export default class GitRepo extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      loading: true,
      username: props.username,
      repos: [],
      filterLang: null
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

  handleFilterLang(language) {
    this.filterLang(language.label);
  }

  filterLang(language) {
    this.setState({
      filterLang: language
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
    const languages = repos.reduce((acc, cur) => {
      if (!acc[cur['language']]) {
        acc[cur['language']] = 0;
      }
      acc[cur['language']]++;
      return acc;
    }, {});
    const langList = Object.entries(languages);
    const totalLanguages = langList.reduce((acc, cur) => acc + cur[1], 0);

    return (
      <div className="row">
        <h3>Repo summary</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <GitStat count={totalStars} label="stars"></GitStat>
          <GitStat count={totalForks} label="forks"></GitStat>
          <GitStat count={totalOpenIssues} label="issues"></GitStat>
          <GitStat count={totalLanguages} label="languages"></GitStat>
        </div>
        <div>
          {
            langList.map(lang =>
              <LangLabel onClick={this.handleFilterLang.bind(this)}
                key={lang[0]} label={lang[0]} count={lang[1]} />)
          }
          <ActionLabel onClick={() => this.filterLang(null)}
            className="label label-default"><i className="fa fa-close"></i> Clear</ActionLabel>
        </div>
        <br/>
        {
          repos
          .filter(repo => !repo.fork)
          .filter(repo => {
            if (this.state.filterLang) {
              return repo.language === this.state.filterLang;
            }
            return repo;
          })
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
