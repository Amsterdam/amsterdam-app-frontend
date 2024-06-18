// To fix the typing of the application insights npm package
// Open PR: https://github.com/microsoft/applicationinsights-react-native/pull/50
// When this PR is merged and this package is updated then this can be removed
const fs = require('fs')
const path = require('path')

// Path to the JSON filea
const filePath = path.join(
  __dirname,
  '../node_modules/@microsoft/applicationinsights-react-native/package.json',
)

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)

    return
  }

  // Parse the JSON data
  let jsonData

  try {
    jsonData = JSON.parse(data)
  } catch (err1) {
    console.error('Error parsing JSON data:', err1)

    return
  }

  // Replace the code
  jsonData.exports['.'] = {
    types: './types/index.d.ts',
    import: './dist-esm/index.js',
    default: './dist/applicationinsights-react-native.js',
  }
  jsonData.exports['./manual'] = {
    types: './types/manualIndex.d.ts',
    import: './dist-esm/manualIndex.js',
    default: './dist/applicationinsights-react-native.js',
  }

  // Convert the updated JSON object back to a string
  const updatedData = JSON.stringify(jsonData, null, 2)

  // Write the updated JSON back to the file
  fs.writeFile(filePath, updatedData, 'utf8', err2 => {
    if (err2) {
      console.error('Error writing the file:', err2)

      return
    }

    console.log(
      './node_modules/@microsoft/applicationinsights-react-native/package.json has been updated successfully.',
    )
  })
})
