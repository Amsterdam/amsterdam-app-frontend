import {run} from './run.mts'
import type {CodeGenConfig} from '../types.mts'

export const formatAll = (config: CodeGenConfig) => {
  run('npx', ['prettier', '--write', ...config.map(({output}) => output)])
}
