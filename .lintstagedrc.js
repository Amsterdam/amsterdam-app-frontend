module.exports = {
    '*.{ts,tsx}': ['eslint --cache --fix --max-warnings=0', 'tsc -p tsconfig.json --noEmit'],
}
