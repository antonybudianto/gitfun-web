import React from 'react';

import './GitRepo.css';
import GitRepoCard from '../../common/GitRepoCard';
import GitStat from '../../common/GitStat';

const ActionLabel = ({children, onClick, active}) =>
  <span onClick={onClick} className={'label ' + (active ? 'label-success' : 'label-info')} style={{
    display: 'inline-block',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 5,
    cursor: 'pointer'
  }}>{children}</span>

const LangLabel = ({label, count, onClick, active}) =>
  <ActionLabel active={active} onClick={() => onClick({label, count})}>
    {label} &nbsp;<span className="badge">{count}</span>
  </ActionLabel>

export default class GitRepo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      loading: true,
      repoQuery: '',
      repos: [],
      filterLang: null,
      page: 1,
      lastPage: false,
      skipFork: true
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.username === props.username) {
      return;
    }

    this.setState({
      username: props.username,
      repos: [],
      filterLang: null,
      page: 1,
      lastPage: false,
      skipFork: true
    }, () => this.fetchRepo(this.state.username));
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

  handleSearchRepo(event) {
    this.setState({
      repoQuery: event.target.value
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
      <div style={{paddingTop: 10}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <input value={this.state.repoQuery} onChange={this.handleSearchRepo.bind(this)} type="text" placeholder="Search repo..." className="form-control"/>
          </div>
        </div>
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
          <div className="col-md-12 text-center">
            {
              langList.map(lang =>
                <LangLabel active={lang[0] === this.state.filterLang} onClick={this.handleFilterLang.bind(this)}
                  key={lang[0]} label={lang[0]} count={lang[1]} />)
            }
            <ActionLabel onClick={() => this.filterLang(null)}>
              <i className="fa fa-close"></i> Clear</ActionLabel>
            <span style={{marginLeft: 5}}>
              <label>
                <input onChange={this.toggleFork.bind(this)} checked={this.state.skipFork} type="checkbox"/> skip forks
              </label>
            </span>
          </div>
        </div>
        <br/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {
            repos
            .filter(repo => {
              if (this.state.filterLang) {
                return repo.language === this.state.filterLang;
              }
              return repo;
            })
            .filter(repo => {
              if (this.state.repoQuery) {
                return repo.name.search(this.state.repoQuery) > -1
              }
              return repo;
            })
            .map(repo =>
                <GitRepoCard key={repo.id} repo={repo}></GitRepoCard>
            )
          }
        </div>
        <div className="col-md-12 text-center">
          <button disabled={this.state.loading}
            onClick={this.loadMore.bind(this)} className="btn btn-primary">
            { this.state.loading ? <i className="fa fa-spin fa-circle-o-notch"></i> : 'Load more' }
          </button>
        </div>
      </div>
    )
  }
}
