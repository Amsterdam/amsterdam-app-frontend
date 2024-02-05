import {type ReactNode, useEffect} from 'react'
import {UpdateFigure} from '@/assets/images/errors/UpdateFigure'
import {ErrorContent} from '@/components/ui/layout/ErrorScreen'
import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {useOpenStore} from '@/hooks/useOpenStore'
import {useUpdateSuggestion} from '@/hooks/useUpdateSuggestion'
import {type VersionInfo, useGetReleaseQuery} from '@/services/modules.service'

type Props = {
  children: ReactNode
}

export const SNOOZE_TIME_IN_HOURS = 0

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

  const hideSplashScreen = useHideSplashScreen()

  const supported = data?.versionInfo.supported

  useEffect(() => {
    if (supported === false || isError) {
      hideSplashScreen()
    }
  }, [hideSplashScreen, isError, supported])

  useUpdateSuggestion(SNOOZE_TIME_IN_HOURS, data?.versionInfo)

  if (supported === false) {
    return (
      <Screen
        scroll={false}
        withLeftInset={!!isPortrait}
        withRightInset={!!isPortrait}
        withTopInset={isPortrait}>
        <ErrorContent
          buttonAccessibilityLabel="Om de app te gebruiken moet u eerst updaten"
          buttonLabel="Update de app"
          Image={UpdateFigure}
          insetTop
          onPress={openStore}
          testId="UpdateScreenOpenStoreButton"
          text="Om de app te kunnen gebruiken moet u eerst updaten."
          title="De versie van de app is verouderd en werkt niet meer."
        />
      </Screen>
    )
  }

  return children
}
