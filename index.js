const GIT_URL = "https://api.github.com/repos/mswist/SWB/contents"

async function getDirectoriesFromGit(url) {
  const response = await fetch(url);
  return response.json();
}

function listDirectories(gitContent) {
  const directories = gitContent.filter(el => el.type == "dir")
  directories.forEach(dir => { displayDirElement(dir) })
}

function displayDirElement(dir) {
  const href = document.createElement("a")
  href.textContent = dir.name
  href.href = `./${dir.path}`
  document.body.insertAdjacentElement("afterbegin", href)
}

getDirectoriesFromGit(GIT_URL)
  .then(resp => { listDirectories(resp) })
