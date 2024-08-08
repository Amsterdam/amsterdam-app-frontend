'use strict'
const path = require('path')
const moduleVisitor = require('eslint-module-utils/moduleVisitor').default
const pkgUp = require('eslint-module-utils/pkgUp').default

const messages = {
  noRelativeFileImport: 'No relative file import',
}

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'Disallow relative file imports',
      category: 'Import improvements',
      recommended: true,
    },
    messages,
    fixable: 'code',
  },

  create: context =>
    moduleVisitor(
      (source, node) => {
        const filename = context.physicalFilename ?? context.filename
        const fileDir = path.dirname(filename)
        const filePath = path.join(fileDir, source.value)
        const packageJsonPath = path.dirname(
          pkgUp({
            cwd: fileDir,
            normalize: false,
          }),
        )

        const result = filePath.replace(packageJsonPath + '/src', '@')

        if (source.value.startsWith('.') && result.startsWith('@')) {
          context.report({
            node,
            messageId: 'noRelativeFileImport',
            fix: fixer =>
              fixer.replaceText(
                source,
                source.raw.replace(source.value, result),
              ),
          })
        }
      },
      {commonjs: true},
    ),
}
