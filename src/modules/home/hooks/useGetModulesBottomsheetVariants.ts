import {useMemo, type FC} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import {useModules} from '@/hooks/useModules'
import {bottomSheetVariantsHome} from '@/modules/generated/bottomSheetVariantsHome.generated'

/**
 * Get the survey BottomSheets opened after an action triggered by an action button.
 */
export const useGetModulesBottomsheetVariants = () => {
  const {enabledModules} = useModules()

  return useMemo(
    () =>
      enabledModules?.reduce(
        (acc, {slug}) => {
          if (
            !(
              bottomSheetVariantsHome as Partial<
                Record<ModuleSlug, Record<string, FC>>
              >
            )[slug]
          ) {
            return acc
          }

          return {
            ...acc,
            ...(
              bottomSheetVariantsHome as Partial<
                Record<ModuleSlug, Record<string, FC>>
              >
            )[slug],
          }
        },
        {} as Record<string, FC>,
      ),
    [enabledModules],
  )
}
