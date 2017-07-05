import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './GitMain.css';

import GitProfileCard from '../../common/GitProfileCard';

class GitMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: false,
      users: [],
      redirectTo: null
    };
  }

  handleTextChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true
    }, () => this.fetchProfile());
  }

  fetchProfile() {
    const { value } = this.state;

    const endpoint = `https://api.github.com/search/users?q=${value}`;

    fetch(endpoint, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        loading: false,
        users: result['items']
      });
    }, (err) => {
      this.setState({
        loading: false
      });
    });
  }

  navigateToProfile(data) {
    const { login } = data;
    this.setState({
      redirectTo: `/profile/${login}`
    });
  }

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      );
    }
    return (
      <div className="GitMain row">
        <div className="GitMain-header col-md-12">
          <div className="col-md-4 col-md-offset-4">
            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <div className="input-group">
              <input value={this.state.value} onChange={this.handleTextChange.bind(this)} type="text" className="form-control" placeholder="Search GitHub username" />
              <div className="input-group-btn">
                <button disabled={!this.state.value} type="submit" className="btn btn-primary"><i className="fa fa-search"></i> Search</button>
              </div>
            </div>
            </form>
          </div>
        </div>
        <div className="GitMain-intro col-md-6 col-md-offset-3">
          {
            this.state.loading ? (
              <div><i className="fa fa-spin fa-spinner"></i> Loading....</div>
            ) : (
              <div className="row">
                {
                  this.state.users.length > 0 ? null : (
                    <div>Start by searching some user!</div>
                  )
                }
                {
                  this.state.users.map(user =>
                    <div className="col-md-2 col-xs-3" key={user.id}>
                      <GitProfileCard onClick={this.navigateToProfile.bind(this)} user={user}></GitProfileCard>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default GitMain;
