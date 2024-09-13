import { InvalidTestCase, RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from '../src/rules/no-date-equality-check';
import * as path from 'node:path';

const ruleTester = new RuleTester({
  // @ts-ignore - this line reports an error when running with jest
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: path.resolve(__dirname, '..'),
    },
  },
});

function getInvalidTestCase(code: string): InvalidTestCase<'noDateEquality', []> {
  return {
    code,
    errors: [
      {
        column: 1,
        endColumn: code.length + 1,
        messageId: 'noDateEquality',
      },
    ],
  };
}

ruleTester.run('no-date-equality-check', rule, {
  valid: ['new Date() > new Date()', 'new Date() < new Date()'].map((code) => ({
    code,
  })),
  invalid: [
    'new Date() != new Date()',
    'new Date() !== new Date()',
    'new Date() <= new Date()',
    'new Date() == new Date()',
    'new Date() === new Date()',
    'new Date() >= new Date()',
  ].map(getInvalidTestCase),
});
