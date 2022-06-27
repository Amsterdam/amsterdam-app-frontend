module.exports = {
    '*.{ts,tsx}': [
        'eslint --cache --fix --max-warnings=0',
        // @TODO: we would like to add a TypeScript check, but tsc is at the moment "unintegratable" (https://github.com/okonet/lint-staged/issues/825)
        // () => 'tsc -p ./tsconfig.json --noEmit --skipLibCheck'
    ],
}
