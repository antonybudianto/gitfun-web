import React from 'react';

const styles = {
  repoSpan: {
    margin: '5px'
  }
};

const GitRepoCard = ({repo}) =>
  <div className="panel panel-info">
    <div className="panel-heading">
      <h3 className="panel-title"><a href={repo.html_url}>{repo.name} {repo.fork ? <i className="fa fa-code-fork"></i> : null}</a></h3>
    </div>
    <div className="panel-body">
      <div>
      {repo.description || <div style={{color: 'gray', fontStyle: 'italic'}}>No description</div>}
      </div>
      <br/>
      <div>
        <span style={styles.repoSpan}>{repo.stargazers_count} <i className="fa fa-star"></i></span>
        <span style={styles.repoSpan}>{repo.watchers} <i className="fa fa-eye"></i></span>
        <span style={styles.repoSpan}>{repo.forks} <i className="fa fa-code-fork"></i></span>
        <span style={styles.repoSpan}>{repo.open_issues} issues</span>
      </div>
      <div>{repo.language}</div>
    </div>
  </div>

export default GitRepoCard;
