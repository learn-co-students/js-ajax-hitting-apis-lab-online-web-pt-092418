function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(
      branch =>
        '<li>' + branch.name + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  debugger;
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>'+ commit.commit.author.name +
        commit.author.login+
        commit.commit.message+
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList
}

function getCommits(el) {
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' +
    el.dataset.username +
    '/' + el.dataset.repository +
    '/commits');
  req.send();
}

function getBranches(el) {
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' +
    el.dataset.username +
    '/' + el.dataset.repository +
    '/branches');
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = `<ul>${repos
    .map(repo => '<li>' + repo.name +
      '-<a href= ' + repo.html_url + '>URL</a>' +
      '-<a href="#" data-repo1="' + repo.name + '" data-repo2="' + repo.owner.login + '"onclick="getCommits(this)">Get Commits</a>' +
      '-<a href="#" data-repo1="' + repo.url + '"onclick="getBranches(this)">Get Branches</a>' +
      '</li>').join('')}
    </ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  let input = document.querySelector('input').value
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${input}/repos`);
  req.send();
}
