import {ReactNode} from 'react'
import {UpdateFigure} from '@/assets/images/errors/UpdateFigure'
import {ErrorScreen} from '@/components/ui/layout/ErrorScreen'
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
      supported: true,
    },
  } as unknown as {versionInfo: VersionInfo} | undefined,
  isLoading: false,
  isError: false,
})

export const UpdateScreen = ({children}: Props) => {
  const {data} = tempDummyRequest()
  const {isLoading} = useGetReleaseQuery()
  const openStore = useOpenStore()

  useUpdateSuggestion(SNOOZE_TIME_IN_HOURS, data?.versionInfo)

  if (isLoading) {
    return children
  }

  if (!data?.versionInfo.supported) {
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
