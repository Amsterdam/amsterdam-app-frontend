import {run} from './run.mts'
import type {CodeGenConfig} from '../types.mts'

export const lintAll = (config: CodeGenConfig) => {
  run('npx', ['eslint', '--fix', ...config.map(({output}) => output)])
}
