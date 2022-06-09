const buildNumber = parseInt(
  require('child_process')
    .execSync('git rev-list --count HEAD')
    .toString()
    .trim(),
  10,
)
console.log(buildNumber)
