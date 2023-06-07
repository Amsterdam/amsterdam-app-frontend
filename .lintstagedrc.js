module.exports = {
  '*.(js|jsx|ts|tsx)': 'eslint --cache --fix --max-warnings=0',
  '*.(ts|tsx)': 'npx tsc-files --noEmit',
}
