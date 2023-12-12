import {ReactNode, useEffect, useState} from 'react'
import {Alert} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Screen} from '@/components/ui/layout/Screen'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenStore} from '@/hooks/useOpenStore'
import {useGetReleaseQuery} from '@/services/modules.service'

type Props = {
  children: ReactNode
}

const tempDummyRequest = () => ({
  data: {
    versionInfo: {
      deprecated: true,
      latestVersion: '1.34.7',
      supported: false,
    },
  },
  isLoading: false,
  isError: false,
})

const HOURS_TO_HIDE_ALERT = 4

const shouldShowAlert = (lastSeenTimestamp: number) =>
  lastSeenTimestamp + HOURS_TO_HIDE_ALERT * 3600000 < Date.now()

export const UpdateScreen = ({children}: Props) => {
  const {data} = tempDummyRequest()
  const {isError, isLoading} = useGetReleaseQuery()
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState<number>(0)

  const openStore = useOpenStore()

  useEffect(() => {
    if (!data?.versionInfo) {
      return
    }

    if (
      data.versionInfo.deprecated &&
      data.versionInfo.supported &&
      shouldShowAlert(lastSeenTimestamp)
    ) {
      setLastSeenTimestamp(Date.now())
      Alert.alert(
        'Alert Title',
        `Versie ${data.versionInfo.latestVersion} is beschikbaar`,
        [
          {
            text: 'Naar de app',
            style: 'cancel',
          },
          {
            text: 'Updaten',
            onPress: openStore,
            style: 'default',
          },
        ],
        {
          cancelable: true,
        },
      )
    }
  }, [data.versionInfo, lastSeenTimestamp, openStore])

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
