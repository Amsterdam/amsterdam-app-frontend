import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {clientModules} from '@/modules/modules'
import {PiwikAction, usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {selectDisabledModules} from '@/store/slices/modules'

export const useLogModuleAnalytics = () => {
  const {ready, trackCustomEvent} = usePiwik()
  const userDisabledModulesBySlug = useSelector(selectDisabledModules)

  useEffect(() => {
    if (!ready) {
      return
    }

    const dimensions = clientModules?.reduce((acc, module) => {
      if (!module.logDimension) {
        return acc
      }

      return {
        ...acc,
        [module.logDimension]: !userDisabledModulesBySlug.includes(module.slug),
      }
    }, {})

    trackCustomEvent('modules', PiwikAction.moduleChange, dimensions)
  }, [ready, trackCustomEvent, userDisabledModulesBySlug])
}
