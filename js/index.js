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
  debugger;
  // IRL el.dataset.repo1 = "https://api.github.com/repos/octocat/boysenberry-repo-1"
  req.addEventListener('load', displayCommits);
  // IRL req.open('GET', el.dataset.repo1 + '/commits')
  req.open('GET', 'https://api.github.com/repos/' +
    el.dataset.username +
    '/' + el.dataset.repository +
    '/commits');
  req.send();
}

function getBranches(el) {
  let req = new XMLHttpRequest();
  debugger;
  // IRL el.dataset.repo1 = "https://api.github.com/repos/octocat/boysenberry-repo-1"
  req.addEventListener('load', displayCommits);
  // IRL req.open('GET', el.dataset.repo1 + '/branches')
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
      '-<a href="#" data-repo1="' + repo.url + '"onclick="getCommits(this)">Get Commits</a>' +
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
