import { RuleTester } from '@typescript-eslint/rule-tester';
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
  ].map((code) => ({
    code,
    errors: [{ messageId: 'noDateEquality' }],
  })),
});
