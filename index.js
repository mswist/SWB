async function getDirectoriesFromGit(url) {
  const response = await fetch(url);
  return response.json();
}

getDirectoriesFromGit("https://api.github.com/repos/mswist/SWB/contents")
  .then(resp => console.log(resp))
