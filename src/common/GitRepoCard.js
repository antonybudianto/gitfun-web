import React from 'react';

const styles = {
  repoSpan: {
    margin: '5px'
  }
};

const GitRepoCard = ({repo}) =>
  <div className="panel panel-default" style={{
    width: '90%'
  }}>
    <div className="panel-body">
      <div className="col-md-8">
        <div>
          <strong>
            <a href={repo.html_url}>{repo.name} {repo.fork ? <i className="fa fa-code-fork"></i> : null}
            </a>
          </strong>
        </div>
        <div style={{
          marginTop: '5px'
        }}>
        {repo.description || <div style={{color: 'gray', fontStyle: 'italic'}}>No description</div>}
        </div>
      </div>
      <div className="col-md-4">
        <div>
          <span style={styles.repoSpan}>{repo.stargazers_count} <i className="fa fa-star"></i></span>
          <span style={styles.repoSpan}>{repo.watchers} <i className="fa fa-eye"></i></span>
          <span style={styles.repoSpan}>{repo.forks} <i className="fa fa-code-fork"></i></span>
          <span style={styles.repoSpan}>{repo.open_issues} issues</span>
        </div>
        <div>{repo.language}</div>
      </div>
    </div>
  </div>

export default GitRepoCard;
