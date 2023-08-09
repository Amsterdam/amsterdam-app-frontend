'use strict'

const isProperty = property => property.type === 'Property'

const messages = {
  noSpreading: 'Explicit spreading is forbidden',
}

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'Disallow JSX explicit spreading',
      category: 'JSX improvements',
      recommended: true,
    },
    messages,
    fixable: 'code',
  },

  create: context => ({
    JSXSpreadAttribute: node => {
      if (
        node.argument.type === 'ObjectExpression' &&
        node.argument.properties.every(isProperty)
      ) {
        context.report({
          node,
          messageId: 'noSpreading',
          fix: fixer =>
            fixer.replaceText(
              node,
              node.argument.properties
                .map(
                  property => `${property.key.name}={${property.value.name}}`,
                )
                .join(' '),
            ),
        })
      }
    },
  }),
}
