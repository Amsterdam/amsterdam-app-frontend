import {useCallback} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useSelector} from '@/hooks/redux/useSelector'
import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {selectChatIsOpen, selectChatVisibility} from '@/modules/chat/slice'
import {ChatVisibility} from '@/modules/chat/types'
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

  const chatIsOpen = useSelector(selectChatIsOpen)
  const chatVisibility = useSelector(selectChatVisibility)
  const chatIsMaximized = chatVisibility === ChatVisibility.maximized
  const pauseRefetch = chatIsOpen && chatIsMaximized

  const refetchFn = useCallback(() => {
    if (!pauseRefetch) {
      return refetch()
    }
  }, [refetch, pauseRefetch])

  useRefetchInterval(refetchFn, refetchInterval)

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
    <Column gutter="sm">
      <Paragraph>{getQueuedPhrase(queued)}</Paragraph>
      <Paragraph>{getWaitingTimePhrase(waitingTime)}</Paragraph>
    </Column>
  )
}
