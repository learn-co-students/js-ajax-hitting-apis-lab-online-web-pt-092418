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
    <ul>${repos.map(repo => '<li>' + repo.name + ' - ' + '<a href=' + repo.html_url + '>' + 'URL' + '</a>' + '- <a href="#" data-repo1="' + repo.name + '" data-repo2="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + '</li>')}
    </ul>
  `
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  // debugger
  let repoName = el.dataset.repo1;
  let repoOwnerLogin = el.dataset.repo2;

  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + repoOwnerLogin + '/' + repoName + '/commits');
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
    // debugger
  let commitsList = `<ul>
    ${commits.map(
      function(commit) {

        // debugger
        let li =
        '<li>' +
        // commit.author.login +
        commit.commit.author.name +
        commit.commit.message +
        '</li>'

        return li
      }
  )}
  </ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
