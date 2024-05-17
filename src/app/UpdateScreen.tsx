import {type ReactNode, useEffect} from 'react'
import {ScreenOutsideNavigation} from '@/components/features/screen/Screen'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {UpdateFigure} from '@/components/ui/media/errors/UpdateFigure'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {useOpenStore} from '@/hooks/useOpenStore'
import {useUpdateSuggestion} from '@/hooks/useUpdateSuggestion'
import {ScreenOutsideNavigationName} from '@/processes/piwik/types'
import {useGetReleaseQuery} from '@/services/modules.service'

type Props = {
  children: ReactNode
}

export const SNOOZE_TIME_IN_HOURS = 4

export const UpdateScreen = ({children}: Props) => {
  const {data: releaseData, isError} = useGetReleaseQuery()
  const openStore = useOpenStore()
  const {isPortrait} = useDeviceContext()

  const isSupported = releaseData?.isSupported

  const hideSplashScreen = useHideSplashScreen()

  useEffect(() => {
    if (isSupported === false || isError) {
      hideSplashScreen()
    }
  }, [hideSplashScreen, isError, isSupported, releaseData])

  useUpdateSuggestion(
    SNOOZE_TIME_IN_HOURS,
    releaseData?.latestVersion,
    releaseData?.isDeprecated,
    isSupported,
  )

  if (isSupported === false) {
    return (
      <ScreenOutsideNavigation
        name={ScreenOutsideNavigationName.updateScreen}
        scroll={false}
        testID="UpdateScreen"
        withLeftInset={!!isPortrait}
        withRightInset={!!isPortrait}
        withTopInset={isPortrait}>
        <FullScreenError
          buttonAccessibilityLabel="Om de app te gebruiken moet u eerst updaten"
          buttonLabel="Update de app"
          Image={UpdateFigure}
          onPress={openStore}
          testProps={{
            testID: 'UpdateScreenOpenStoreButton',
          }}
          text="Om de app te kunnen gebruiken moet u eerst updaten."
          title="De versie van de app is verouderd en werkt niet meer."
        />
      </ScreenOutsideNavigation>
    )
  }

  return children
}
