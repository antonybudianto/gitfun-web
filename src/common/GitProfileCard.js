import React from 'react';

const GitProfileCard = ({ user }) =>
  <div style={{marginBottom: '15px'}} className="col-xs-3" key={user.id}>
    <a href="#" className="thumbnail">
      <img alt={user.login} src={user['avatar_url']} />
    </a>
    {user.login}
  </div>

export default GitProfileCard;
