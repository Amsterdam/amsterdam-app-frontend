import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {useRefetchInterval} from '@/hooks'
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

  if (isError) {
    return null
  }

  if (isLoading || !waitingTimes) {
    return <PleaseWait />
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
        <Row gutter="md" valign="center">
          <Icon name="two-persons" size="xl" />
          <Paragraph>{getQueuedPhrase(queued)}</Paragraph>
        </Row>
        <Row gutter="md" valign="center">
          <Icon name="clock" size="xl" />
          <Paragraph>{getWaitingTimePhrase(waitingTime)}</Paragraph>
        </Row>
      </Column>
    </Box>
  )
}
