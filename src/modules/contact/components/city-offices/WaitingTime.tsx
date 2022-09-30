import React, {SVGProps} from 'react'
import {Clock, TwoPersons} from '@/assets/icons'
import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {useGetWaitingTimesQuery} from '@/modules/contact/service'
import {
  getQueuedPhrase,
  getWaitingTimePhrase,
} from '@/modules/contact/utils/getPhrase'
import {Theme, useThemable} from '@/themes'

type Props = {
  cityOfficeId: string
}

export const WaitingTime = ({cityOfficeId}: Props) => {
  const {data: waitingTimes, isLoading} = useGetWaitingTimesQuery()
  const iconProps = useThemable(createIconProps)

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
          <Icon size={32}>
            <TwoPersons {...iconProps} />
          </Icon>
          <Paragraph>{getQueuedPhrase(queued)}</Paragraph>
        </Row>
        <Row gutter="md" valign="center">
          <Icon size={32}>
            <Clock {...iconProps} />
          </Icon>
          <Paragraph>{getWaitingTimePhrase(waitingTime)}</Paragraph>
        </Row>
      </Column>
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.default,
})
