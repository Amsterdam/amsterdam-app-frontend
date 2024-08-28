import {RuleTester} from 'eslint'
import jsxStrictLogicalExpression from './jsx-strict-logical-expression'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run('jsx-strict-logical-expression', jsxStrictLogicalExpression, {
  valid: [
    {
      code: `const str = "Foo";
<App>{!!str && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let str = "Foo";
<App>{!!str && <Foo />}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let bool = true;
<App>{!!bool && <Foo />}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let num = 100;
<App>{!!num && <Foo />}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let num = 100;
<App>{Boolean(num) && <Foo />}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let str = "Foo";
<App>{Boolean(str) && <Foo />}</App>`,
      filename: 'react.tsx',
    },
  ],
  invalid: [
    {
      code: `const str = "Foo";
<App>{str && <Foo/>}</App>`,
      filename: 'react.tsx',
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const str = "Foo";
<App>{!!str && <Foo/>}</App>`,
    },
    {
      code: `const bool = true;
<App>{bool && <Foo />}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const bool = true;
<App>{!!bool && <Foo />}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `const num = 100;
<App>{num && <Foo />}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const num = 100;
<App>{!!num && <Foo />}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let num = 100;
<App>{num && <Foo />}</App>`,
      output: `let num = 100;
<App>{!!num && <Foo />}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      filename: 'react.tsx',
    },
    {
      code: `let str = "foo";
<App>{str && <Foo />}</App>`,
      output: `let str = "foo";
<App>{!!str && <Foo />}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      filename: 'react.tsx',
    },
    {
      code: `const obj = { foo: 0 };
<App>{obj.foo && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const obj = { foo: 0 };
<App>{!!obj.foo && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `const obj = { foo: { bar: "" } };
<App>{obj.foo.bar && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const obj = { foo: { bar: "" } };
<App>{!!obj.foo.bar && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `const first = "Foo"
const second = { bar: 0 };
<App>{first && second.bar && <Foo/>}</App>`,
      errors: [
        {messageId: 'conditionErrorFalsey'},
        {messageId: 'conditionErrorFalsey'},
      ],
      output: `const first = "Foo"
const second = { bar: 0 };
<App>{!!first && !!second.bar && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let num = 100;
<App>{num && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `let num = 100;
<App>{!!num && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let str = "foo";
<App>{str && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `let str = "foo";
<App>{!!str && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `const num = 0;
<App>{num && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const num = 0;
<App>{!!num && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `const str = "";
<App>{str && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `const str = "";
<App>{!!str && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let thisOrThat: Record<any, any> | string;
<App>{thisOrThat && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `let thisOrThat: Record<any, any> | string;
<App>{!!thisOrThat && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `let thisOrThat: Record<any, any> | number;
<App>{thisOrThat && <Foo/>}</App>`,
      errors: [{messageId: 'conditionErrorFalsey'}],
      output: `let thisOrThat: Record<any, any> | number;
<App>{!!thisOrThat && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
    {
      code: `const first = { foo: "bar" };
let second = "foo";
<App>{first && second && <Foo/>}</App>`,
      errors: [
        {messageId: 'conditionErrorFalsey'},
        {messageId: 'conditionErrorFalsey'},
      ],
      output: `const first = { foo: "bar" };
let second = "foo";
<App>{!!first && !!second && <Foo/>}</App>`,
      filename: 'react.tsx',
    },
  ],
})
