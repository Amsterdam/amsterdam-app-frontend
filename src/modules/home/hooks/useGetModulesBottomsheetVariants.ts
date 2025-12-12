import {useMemo, type FC} from 'react'
import {useModules} from '@/hooks/useModules'

/**
 * Get the survey bottomsheets opened after an action triggered by an action button.
 */
export const useGetModulesBottomsheetVariants = () => {
  const {enabledModules} = useModules()

  return useMemo(() => {
    const variants: Record<string, FC> = {}

    enabledModules?.forEach(({bottomSheetVariantsHome}) => {
      if (bottomSheetVariantsHome) {
        Object.entries(bottomSheetVariantsHome).forEach(([key, Component]) => {
          variants[key] = Component
        })
      }
    })

    return variants
  }, [enabledModules])
}
