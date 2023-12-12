import {ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Screen} from '@/components/ui/layout/Screen'
import {Phrase} from '@/components/ui/text/Phrase'
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
      deprecated: true,
      latest: '1.34.7',
      supported: true,
    },
  } as unknown as {versionInfo: VersionInfo} | undefined,
  isLoading: false,
  isError: false,
})

export const UpdateScreen = ({children}: Props) => {
  const {data} = tempDummyRequest()
  const {isError, isLoading} = useGetReleaseQuery()

  useUpdateSuggestion(SNOOZE_TIME_IN_HOURS, data?.versionInfo)

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (!data?.versionInfo.supported) {
    return (
      <Screen withTopInset>
        <Box>
          <Phrase>Update!</Phrase>
        </Box>
      </Screen>
    )
  }

  return children
}
