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
  const {modules: selectedModuleSlugs} = useSelector(selectModules)

  const selectedClientModules = clientModules.map(m => ({
    ...m,
    isSelected: selectedModuleSlugs.includes(m.slug),
  }))

  let modules = combineClientAndServerModules(
    selectedClientModules,
    serverModules,
  )

  if (!includeInactive) {
    modules = modules.filter(m => m.status === 1)
  }

  if (!includeDeselected) {
    modules = modules.filter(m => selectedModuleSlugs.includes(m.slug))
  }

  return {modules, isLoading}
}
