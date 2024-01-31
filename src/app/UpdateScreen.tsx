import {type ReactNode, useEffect} from 'react'
import {UpdateFigure} from '@/assets/images/errors/UpdateFigure'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {ErrorScreen} from '@/components/ui/layout/ErrorScreen'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {useOpenStore} from '@/hooks/useOpenStore'
import {useUpdateSuggestion} from '@/hooks/useUpdateSuggestion'
import {type VersionInfo, useGetReleaseQuery} from '@/services/modules.service'

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
      supported: true,
    },
  } as unknown as {versionInfo: VersionInfo} | undefined,
  isLoading: false,
  isError: false,
})

export const UpdateScreen = ({children}: Props) => {
  const {data} = tempDummyRequest()
  const {isError, isLoading, refetch} = useGetReleaseQuery()
  const openStore = useOpenStore()

  const hideSplashScreen = useHideSplashScreen()

  const supported = data?.versionInfo.supported

  useEffect(() => {
    if (supported === false) {
      hideSplashScreen()
    }
  }, [hideSplashScreen, supported])

  useUpdateSuggestion(SNOOZE_TIME_IN_HOURS, data?.versionInfo)

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return (
      <ErrorScreen
        buttonLabel="Probeer het opnieuw"
        Image={UpdateFigure}
        onPress={refetch}
        testId="UpdateScreenError"
        text="Sorry, het is niet gelukt om de data op te halen. Heb je internet aan staan?"
        title="Er is iets misgegaan"
      />
    )
  }

  if (supported === false) {
    return (
      <ErrorScreen
        buttonAccessibilityLabel="Om de app te gebruiken moet u eerst updaten"
        buttonLabel="Update de app"
        Image={UpdateFigure}
        onPress={openStore}
        testId="ErrorScreenUpdateButton"
        text="Om de app te kunnen gebruiken moet u eerst updaten."
        title="De versie van de app is verouderd en werkt niet meer."
      />
    )
  }

  return children
}
