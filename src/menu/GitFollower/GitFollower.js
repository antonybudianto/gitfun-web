import React from 'react';

import {
  Redirect,
  withRouter
} from 'react-router-dom'

import GitProfileCard from '../../common/GitProfileCard';

class GitFollower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      loading: false,
      followers: [],
      page: 1,
      lastPage: false,
      redirectTo: null
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.username === props.username) {
      return;
    }

    this.setState({
      username: props.username,
      followers: [],
      page: 1,
      lastPage: false
    }, () => {
      this.fetchFollowers(this.state.username);
    });
  }

  componentDidMount() {
    this.fetchFollowers(this.state.username);
  }

  fetchFollowers(username) {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${username}/followers?page=${this.state.page}`)
    .then(res => res.json())
    .then(result => {
      this.setState((state) => {
        return {
          lastPage: result.length === 0,
          loading: false,
          followers: [...state.followers, ...result]
        }
      });
    });
  }

  loadMore() {
    this.setState((state) => {
      return {
        page: state.page + (this.state.lastPage ? 0 : 1)
      };
    }, () => this.fetchFollowers(this.state.username));
  }

  navigateToProfile(data) {
    const { login } = data;
    this.props.history.push(`/profile/${login}`);
  }

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect push to={this.state.redirectTo} />
      );
    }

    return (
      <div>
        <h3>GitFollower</h3>
        <div className="row">
          <div className="col-md-12" style={{marginTop: 20}}>
            {
              this.state.followers.map(follower =>
                <div className="col-md-2 col-xs-3" key={follower.id}>
                  <GitProfileCard onClick={this.navigateToProfile.bind(this)} user={follower}></GitProfileCard>
                </div>
              )
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button disabled={this.state.loading}
              onClick={this.loadMore.bind(this)} className="btn btn-primary">
              { this.state.loading ? 'Loading...' : 'Load more' }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const GitFollowerWithRouter = withRouter(GitFollower);
export default GitFollowerWithRouter;
