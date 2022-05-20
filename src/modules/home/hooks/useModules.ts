import {useSelector} from 'react-redux'
import {combineClientAndServerModules} from '../../../utils'
import {clientModules} from '../../index'
import {useGetModulesQuery} from '../services'
import {selectModules} from '../store'

export const useModules = () => {
  const {data: serverModules, isLoading} = useGetModulesQuery()
  const {modules: selectedModules} = useSelector(selectModules)

  const modules = combineClientAndServerModules(clientModules, serverModules)
    .filter(m => selectedModules.includes(m.slug))
    // .filter(m => m.status === 1)
    .map(m => ({...m, isSelected: selectedModules.includes(m.slug)}))

  return {modules, isLoading}
}
