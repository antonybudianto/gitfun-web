import React from 'react';

const GitCountDisplay = ({count, label}) =>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    margin: '8px'
  }}>
    <div>{count}</div>
    <div>{label}</div>
  </div>

const GitUserCard = ({user}) =>
  <div>
    <img width="100" src={user['avatar_url']} alt={user['login']}/>
    <div>{user.login}</div>
    <br/>
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <GitCountDisplay count={user.followers} label="followers" />
      <GitCountDisplay count={user.following} label="following" />
      <GitCountDisplay count={user.public_gists} label="gists" />
      <GitCountDisplay count={user.public_repos} label="repos" />
    </div>
    <table className="table table-striped">
      <tbody>
        <tr>
          <th>Name</th>
          <td>{user.name}</td>
        </tr>
        <tr>
          <th>Bio</th>
          <td>{user.bio}</td>
        </tr>
        <tr>
          <th>Company</th>
          <td>{user.company}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>Location</th>
          <td>{user.location}</td>
        </tr>
        <tr>
          <th>Link to GitHub</th>
          <td><a href={user['html_url']}>@{user.login}</a></td>
        </tr>
      </tbody>
    </table>
  </div>

export default GitUserCard;
