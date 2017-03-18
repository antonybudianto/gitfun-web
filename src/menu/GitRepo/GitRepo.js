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

    this.state = {
      loading: true,
      username: props.username,
      repos: [],
      filterLang: null,
      page: 1,
      lastPage: false,
      skipFork: true
    };
  }

  componentDidMount() {
    this.fetchRepo(this.state.username);
  }

  fetchRepo(username) {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${username}/repos?page=${this.state.page}`)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      this.setState((state) => {
        return {
          lastPage: result.length === 0,
          loading: false,
          repos: [...state.repos, ...result]
        }
      });
    });
  }

  loadMore() {
    this.setState((state) => {
      return {
        page: state.page + (this.state.lastPage ? 0 : 1)
      };
    }, () => this.fetchRepo(this.state.username));
  }

  handleFilterLang(language) {
    this.filterLang(language.label);
  }

  filterLang(language) {
    this.setState({
      filterLang: language
    });
  }

  toggleFork() {
    this.setState((state) => {
      return {
        skipFork: !state.skipFork
      };
    });
  }

  render() {
    let repos;
    if (this.state.skipFork) {
      repos = this.state.repos.filter(repo => !repo.fork);
    } else {
      repos = this.state.repos;
    }
    const totalStars = repos.reduce((acc, cur) => acc + cur['stargazers_count'], 0);
    const totalForks = repos.reduce((acc, cur) => acc + cur['forks'], 0);
    const totalOpenIssues = repos.reduce((acc, cur) => acc + cur['open_issues'], 0);
    const languages = repos.reduce((acc, cur) => {
      if (!cur['language']) return acc;
      if (!acc[cur['language']]) {
        acc[cur['language']] = 0;
      }
      acc[cur['language']]++;
      return acc;
    }, {});
    const langList = Object.entries(languages);

    if (!this.state.loading && this.state.repos.length === 0) {
      return (
        <div style={{marginTop: 10}}>@{this.state.username} didn't have any repo yet</div>
      );
    }

    return (
      <div>
        <h3>Repo summary</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <GitStat count={repos.length} label="repos" />
          <GitStat count={totalStars} label="stars" />
          <GitStat count={totalForks} label="forks" />
          <GitStat count={totalOpenIssues} label="issues" />
          <GitStat count={langList.length} label="languages" />
        </div>
        <div className="row">
          <div className="col-md-12">
            {
              langList.map(lang =>
                <LangLabel onClick={this.handleFilterLang.bind(this)}
                  key={lang[0]} label={lang[0]} count={lang[1]} />)
            }
            <ActionLabel onClick={() => this.filterLang(null)}
              className="label label-default"><i className="fa fa-close"></i> Clear</ActionLabel>
            <span style={{marginLeft: 5}}>
              <label>
                <input onChange={this.toggleFork.bind(this)} checked={this.state.skipFork} type="checkbox"/> skip forks
              </label>
            </span>
          </div>
        </div>
        <br/>
        <div>
          {
            repos
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
        <div className="col-md-12">
          <button disabled={this.state.loading}
            onClick={this.loadMore.bind(this)} className="btn btn-primary">
            { this.state.loading ? 'Loading...' : 'Load more' }
          </button>
        </div>
      </div>
    )
  }
}
