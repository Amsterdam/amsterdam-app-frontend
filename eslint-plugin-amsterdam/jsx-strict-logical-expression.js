const {TSESTree} = require('@typescript-eslint/utils')

const messages = {
  conditionErrorFalsey:
    'Potentially falsey value in logical AND expression. Please use boolean cast (!!).',
}

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  name: 'jsx-strict-logical-expression',
  meta: {
    docs: {
      description: 'Forbid non-boolean falsey values in inline expressions',
      recommended: 'error',
    },
    fixable: 'code',
    type: 'problem',
    messages,
  },

  create: context => {
    /**
     *
     * @param {TSESTree.Identifier} node
     * @param {TSESTree.Expression} fixNode
     */
    const reportIdentifier = (node, fixNode) => {
      context.report({
        node,
        messageId: 'conditionErrorFalsey',
        fix: fixer => fixer.insertTextBefore(fixNode, '!!'),
      })
    }

    /**
     *
     * @param {TSESTree.LogicalExpression} expressionNode
     * @param {boolean} checkRightNode
     */
    const checkLogicalExpression = (expressionNode, checkRightNode) => {
      let leftNode = expressionNode.left

      if (
        leftNode.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
        leftNode.property.type !== TSESTree.AST_NODE_TYPES.PrivateIdentifier
      ) {
        leftNode = leftNode.property
      }

      if (leftNode.type === TSESTree.AST_NODE_TYPES.LogicalExpression) {
        checkLogicalExpression(leftNode, true)
      } else if (leftNode.type === TSESTree.AST_NODE_TYPES.Identifier) {
        reportIdentifier(leftNode, expressionNode.left)
      }

      if (checkRightNode) {
        let rightNode = expressionNode.right

        if (
          rightNode.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
          rightNode.property.type !== TSESTree.AST_NODE_TYPES.PrivateIdentifier
        ) {
          rightNode = rightNode.property
        }

        if (rightNode.type === TSESTree.AST_NODE_TYPES.Identifier) {
          reportIdentifier(rightNode, expressionNode.right)
        }
      }
    }

    /**
     *
     * @param {TSESTree.JSXExpressionContainer} node
     */
    const checkJSXExpression = node => {
      if (
        node.expression.type === TSESTree.AST_NODE_TYPES.LogicalExpression &&
        node.expression.operator === '&&'
      ) {
        checkLogicalExpression(node.expression, false)
      }
    }

    return {
      JSXExpressionContainer: checkJSXExpression,
    }
  },
}
