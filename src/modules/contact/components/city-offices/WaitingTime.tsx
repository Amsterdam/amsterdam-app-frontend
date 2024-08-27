import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {useGetWaitingTimesQuery} from '@/modules/contact/service'
import {
  getQueuedPhrase,
  getWaitingTimePhrase,
} from '@/modules/contact/utils/getPhrase'

type Props = {
  cityOfficeId: string
}

const refetchInterval = 1000 * 15

export const WaitingTime = ({cityOfficeId}: Props) => {
  const {
    data: waitingTimes,
    isLoading,
    isError,
    refetch,
  } = useGetWaitingTimesQuery()

  useRefetchInterval(refetch, refetchInterval)

  if (isLoading) {
    return <PleaseWait testID="ContactCityOfficeWaitingTimesLoadingSpinner" />
  }

  if (isError || !waitingTimes) {
    return (
      <SomethingWentWrong
        testID="ContactCityOfficeWaitingTimesSomethingWentWrong"
        text="Door een technische storing kunt u de wachttijden van dit moment niet zien. Probeer het later nog eens."
        title=""
      />
    )
  }

  const waitingTimesForCityOffice = waitingTimes.find(
    w => w.identifier === cityOfficeId,
  )

  if (!waitingTimesForCityOffice) {
    return null
  }

  const {queued, waitingTime} = waitingTimesForCityOffice

  return (
    <Box>
      <Column gutter="md">
        <Row
          gutter="md"
          valign="center">
          <Icon
            name="two-persons"
            size="xl"
            testID="ContactCityOfficeQueueIcon"
          />
          <Paragraph>{getQueuedPhrase(queued)}</Paragraph>
        </Row>
        <Row
          gutter="md"
          valign="center">
          <Icon
            name="clock"
            size="xl"
            testID="ContactCityOfficeTimeIcon"
          />
          <Paragraph>{getWaitingTimePhrase(waitingTime)}</Paragraph>
        </Row>
      </Column>
    </Box>
  )
}
