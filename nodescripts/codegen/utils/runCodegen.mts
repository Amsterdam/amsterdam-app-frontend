import {config} from '../../../codegen.config.mts'
import {formatAll} from './formatAll.mts'
import {generate} from './generate.mts'
import {lintAll} from './lintAll.mts'

export const runCodeGen = () => {
  console.log('Running code generation...')
  config.forEach(generate)
  lintAll(config)
  formatAll(config)
  console.log('Finished code generation.')
}
