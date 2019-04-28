// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  let username = document.querySelector('#username').value
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  let repoList = `
    <ul>${repos.map(repo => '<li>' + repo.name + ' - ' + '<a href=' + repo.html_url + '>' + 'URL' + '</a>' + '- <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a>' + '</li>')}
    </ul>
  `
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  let repoName = el.dataset.repo;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + ownerName + '/' + repoName + '/commits');
  req.send();

}
