import {useSelector} from 'react-redux'
import {combineClientAndServerModules} from '../../../utils'
import {clientModules} from '../../index'
import {useGetModulesQuery} from '../services'
import {selectModules} from '../store'

type Props = {
  includeDeselected?: boolean
  includeInactive?: boolean
}

export const useModules = ({
  includeDeselected = true,
  includeInactive = true,
}: Props) => {
  const {data: serverModules, isLoading} = useGetModulesQuery()
  const {modules: selectedModules} = useSelector(selectModules)

  let modules = combineClientAndServerModules(clientModules, serverModules)

  if (!includeInactive) {
    modules = modules.filter(m => m.status === 1)
  }

  if (!includeDeselected) {
    modules = modules.filter(m => selectedModules.includes(m.slug))
  }

  modules.map(m => ({...m, isSelected: selectedModules.includes(m.slug)}))

  return {modules, isLoading}
}
