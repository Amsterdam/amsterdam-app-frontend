import {type ReactNode, useEffect} from 'react'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {ScreenOutsideNavigation} from '@/components/ui/layout/Screen'
import {UpdateFigure} from '@/components/ui/media/errors/UpdateFigure'
import {
  ScreenOutsideNavigationName,
  useTrackScreen,
} from '@/hooks/piwik/useTrackScreen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {useOpenStore} from '@/hooks/useOpenStore'
import {useUpdateSuggestion} from '@/hooks/useUpdateSuggestion'
import {VersionInfo, useGetReleaseQuery} from '@/services/modules.service'

type Props = {
  children: ReactNode
}

export const SNOOZE_TIME_IN_HOURS = 4

// @TODO
const tempDummyRequest = () => ({
  data: {
    versionInfo: {
      deprecated: false,
      latest: '1.34.7',
      supported: false,
    },
  } as unknown as {versionInfo: VersionInfo} | undefined,
  isLoading: false,
  isError: false,
})

export const UpdateScreen = ({children}: Props) => {
  const {data} = tempDummyRequest()
  const {isError} = useGetReleaseQuery()
  const openStore = useOpenStore()
  const {isPortrait} = useDeviceContext()

  const supported = data?.versionInfo.supported

  const hideSplashScreen = useHideSplashScreen()

  useEffect(() => {
    if (supported === false || isError) {
      hideSplashScreen()
    }
  }, [hideSplashScreen, isError, supported])

  useTrackScreen(ScreenOutsideNavigationName.updateScreen, !supported)

  useUpdateSuggestion(SNOOZE_TIME_IN_HOURS, data?.versionInfo)

  if (supported === false) {
    return (
      <ScreenOutsideNavigation
        scroll={false}
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
