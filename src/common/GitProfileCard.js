import React from 'react';

const GitProfileCard = ({ user, onClick }) =>
  <div style={{marginBottom: '15px'}}>
    <a onClick={() => onClick(user)} href="#" className="thumbnail">
      <img alt={user.login} src={user['avatar_url']} />
    </a>
    {user.login}
  </div>

export default GitProfileCard;
