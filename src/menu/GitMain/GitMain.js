import React, { Component } from 'react';
import './GitMain.css';

import GitProfileCard from '../../common/GitProfileCard';

class GitMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: false,
      users: []
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
    console.log(endpoint);

    fetch(endpoint, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
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

  render() {
    return (
      <div className="GitMain row">
        <div className="GitMain-header col-md-12">
          <div className="col-md-4 col-md-offset-4">
            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <div className="input-group">
              <input value={this.state.value} onChange={this.handleTextChange.bind(this)} type="text" className="form-control" placeholder="Search GitHub username" />
              <div className="input-group-btn">
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
            </div>
            </form>
          </div>
        </div>
        <div className="GitMain-intro col-md-6 col-md-offset-3">
          {
            this.state.loading ? (
              <div>Loading....</div>
            ) : (
              <div className="row">
                {
                  this.state.users.length > 0 ? null : (
                    <div>Start by searching some user!</div>
                  )
                }
                {
                  this.state.users.map(user =>
                    <GitProfileCard onClick={() => alert('a')} key={user.id} user={user}></GitProfileCard>
                  )
                }
              </div>
            )
          }
        </div>
        <div className="col-md-12 GitMain-footer">
          Made by @antonybudianto
        </div>
      </div>
    );
  }
}

export default GitMain;
