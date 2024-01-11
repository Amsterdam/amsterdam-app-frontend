import {ReactNode} from 'react'
import {UpdateFigure} from '@/assets/images/errors/UpdateFigure'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorScreen} from '@/components/ui/layout/ErrorScreen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
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
  const {isError, isLoading} = useGetReleaseQuery()
  const {isPortrait} = useDeviceContext()
  const openStore = useOpenStore()

  useUpdateSuggestion(SNOOZE_TIME_IN_HOURS, data?.versionInfo)

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (!data?.versionInfo.supported) {
    return (
      <ErrorScreen
        Image={UpdateFigure}
        stickyFooter={
          <Box
            insetHorizontal={isPortrait ? 'md' : 'xl'}
            insetVertical="no">
            <Button
              accessibilityHint="Om de app te gebruiken moet u eerst updaten"
              label="Update de app"
              onPress={openStore}
              testID="UpdateAppButton"
            />
          </Box>
        }
        text="Om de app te kunnen gebruiken moet u eerst updaten."
        title="De versie van de app is verouderd en werkt niet meer."
      />
    )
  }

  return children
}
