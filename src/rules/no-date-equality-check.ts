import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator<{ requiresTypeChecking: boolean }>(() => '');

export const rule = createRule({
  name: 'no-date-equality-check',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow equality checks between Date objects.',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noDateEquality: 'Avoid using equality checks between Date objects.',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      BinaryExpression(node) {
        if (['!=', '!==', '<=', '==', '===', '>='].includes(node.operator)) {
          const leftType = checker.getTypeAtLocation(
            parserServices.esTreeNodeToTSNodeMap.get(node.left),
          );
          const rightType = checker.getTypeAtLocation(
            parserServices.esTreeNodeToTSNodeMap.get(node.right),
          );

          const leftTypeString = checker.typeToString(leftType);
          const rightTypeString = checker.typeToString(rightType);

          if (leftTypeString === 'Date' && rightTypeString === 'Date') {
            context.report({
              node,
              loc: {
                start: node.left.loc.start,
                end: node.right.loc.end,
              },
              messageId: 'noDateEquality',
            });
          }
        }
      },
    };
  },
});
