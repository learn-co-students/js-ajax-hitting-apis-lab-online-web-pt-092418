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
  //debugger
  let repoList = `
    <ul>${repos.map(repo => '<li>' + repo.name + ' - ' + '<a href=' + repo.html_url + '>' + 'URL' + '</a>' + '- <a href="#" data-repo1="' + repo.name + '" data-repo2="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a>' +  ' - <a href="#" data-repo1="' + repo.name + '" data-repo2="' + repo.owner.login + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}
    </ul>
  `
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {

  var repoName = el.dataset.repo1;
  var repoOwnerLogin = el.dataset.repo2;

//debugger

  var req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  // debugger
  req.open('GET', 'https://api.github.com/repos/' + el.dataset.repo2 + '/' + el.dataset.repo1 + '/commits');
  debugger
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
    // debugger
  let commitsList = `<ul>
    ${commits.map(
      function(commit) {

        let li =
        '<li>' +
        commit.author.login +
        commit.commit.author.name +
        commit.commit.message +
        '</li>'

        return li
      }
  ).join('')}
  </ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {

  let repoName = el.dataset.repo1;
  let repoOwnerLogin = el.dataset.repo2;

  let req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/' + repoOwnerLogin + '/' + repoName + '/branches')
  //GET /repos/:owner/:repo/branches
  req.send();

}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  let brancheslist = `<ul>
    ${branches.map(
      function(branch) {
        let li =
        '<li>' +
          branch.name +
        '</li>'
        return li
      }
    ).join('')}
  </ul>`
  document.getElementById('details').innerHTML = brancheslist;
}
