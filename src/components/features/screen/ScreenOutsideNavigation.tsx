import {ScreenProps} from '@/components/features/screen/Screen'
import {ScreenBase} from '@/components/features/screen/ScreenBase'
import {useTrackScreenOutsideNavigation} from '@/processes/piwik/hooks/useTrackScreenOutsideNavigation'
import {ScreenOutsideNavigationName} from '@/processes/piwik/types'

type ScreenOutsideNavigationProps = ScreenProps & {
  name: ScreenOutsideNavigationName
}

export const ScreenOutsideNavigation = ({
  name,
  ...screenProps
}: ScreenOutsideNavigationProps) => {
  useTrackScreenOutsideNavigation(name)

  return <ScreenBase {...screenProps} />
}
