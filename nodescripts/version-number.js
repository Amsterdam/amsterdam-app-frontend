const packageJson = require('../package.json')
const buildNumber = parseInt(
  require('child_process')
    .execSync('git rev-list --count HEAD')
    .toString()
    .trim(),
  10,
)

const versionNumber = packageJson.version
const fullVersionNumber = `${versionNumber}.${buildNumber}`

console.log(fullVersionNumber)
