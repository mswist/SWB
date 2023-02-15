async function getDirectoriesFromGit(url) {
  const response = await fetch(url);
  return response.json();
}

function listDirectories(gitContent) {
  const directories = gitContent.filter(el => el.type == "dir")
  directories.forEach(dir => displayDirElement)
}

function displayDirElement(dir) {
  const href = document.createElement("a")
  href.textContent = dir.name
  href.href = `./${dir.path}`
  document.body.insertAdjacentElement("afterbegin", href)
}


getDirectoriesFromGit("https://api.github.com/repos/mswist/SWB/contents")
  .then(resp => listDirectories(resp))
