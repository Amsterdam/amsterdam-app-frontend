module.exports = {
    '*.{ts,tsx}': ['eslint --cache --fix --max-warnings=0', 'npx tsc --noEmitOnError'],
}
