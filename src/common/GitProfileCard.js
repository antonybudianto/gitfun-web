import React from 'react';

const GitProfileCard = ({ user, onClick }) =>
  <div style={{marginBottom: '15px'}}>
    <a onClick={() => onClick(user)} href="#" className="thumbnail">
      <img style={{height: 'auto'}} alt={user.login} src={user['avatar_url']} />
    </a>
    <div style={{
      fontSize: 14,
      textAlign: 'center'
    }}><a href={user['html_url']}>{user.login}</a></div>
  </div>

export default GitProfileCard;
