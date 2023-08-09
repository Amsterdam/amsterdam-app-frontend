import {RuleTester} from 'eslint'
import noExplicitSpread from './jsx-no-explicit-spread'

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

const errors = [{message: 'Explicit spreading is forbidden'}]

ruleTester.run('jsx-no-explicit-spread', noExplicitSpread, {
  valid: [
    {
      code: `
export const Component = ({gutter, flex}: any) => {
  return <Row gutter={gutter} flex={flex}> </Row>
};`,
    },
  ],
  invalid: [
    {
      code: `
export const Component = ({gutter, flex}: any) => {
  return <Row {...{gutter, flex}}> </Row>
};`,
      output: `
export const Component = ({gutter, flex}: any) => {
  return <Row gutter={gutter} flex={flex}> </Row>
};`,
      errors,
    },
  ],
})
