import React from 'react';

import GitStat from './GitStat';

const GitUserCard = ({user}) =>
  <div className="col-md-12">
    <img width="100" src={user['avatar_url']} alt={user['login']}/>
    <div>{user.login}</div>
    <br/>
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <GitStat count={user.followers} label="followers" />
      <GitStat count={user.following} label="following" />
      <GitStat count={user.public_gists} label="gists" />
      <GitStat count={user.public_repos} label="repos" />
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
