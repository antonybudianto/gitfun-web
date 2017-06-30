import React from 'react';

const GitStat = ({count, label}) =>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px'
  }}>
    <div><strong>{count}</strong></div>
    <div style={{
      fontSize: 14
    }}>{label}</div>
  </div>

export default GitStat;
