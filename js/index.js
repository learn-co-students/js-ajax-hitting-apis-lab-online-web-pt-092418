// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  let username = document.querySelector('#username').value
  req.addEventListener('load', showRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send();
}

function showRepositories() {
  let repos = JSON.parse(this.responseText);
  let repoList = `
    <ul>${repos.map(repo => '<li>' + repo.name + ':   ' + repo.html_url + '</li>')}
    </ul>
  `
  document.getElementById('repositories').innerHTML = repoList;
}
