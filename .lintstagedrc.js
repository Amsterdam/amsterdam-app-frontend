// We add our custom d.ts files here, because tsc-files ignores the `includes` in tsconfig.json by design and hence will not find the custom definitions
const definitions = ['src/custom.d.ts']

module.exports = {
  '*.(js|jsx|ts|tsx)': 'eslint --cache --fix --max-warnings=0',
  '*.(ts|tsx)': `npx tsc-files --noEmit ${definitions.join(' ')}`,
}
