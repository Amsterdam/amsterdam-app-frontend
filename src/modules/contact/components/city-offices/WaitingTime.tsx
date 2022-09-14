import React, {SVGProps} from 'react'
import simplur from 'simplur'
import {Clock, PersonalLogin} from '@/assets/icons'
import {Box} from '@/components/ui'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {useGetWaitingTimesQuery} from '@/modules/contact/service'
import {Theme, useThemable} from '@/themes'

type Props = {
  cityOfficeId: string
}

const replaceZero = (q: number) => (q === 0 ? 'geen' : q.toString())

const getQueuedPhrase = (queued: number) =>
  simplur`Er ${[queued]} [is|zijn] nu ${[queued, replaceZero]} wachtende[|n]`

const getWaitingTimePhrase = (waitingTime: number) =>
  'De wachttijd is ' +
  (waitingTime >= 60
    ? 'meer dan een uur'
    : simplur`${waitingTime} minu[ut|ten]`)

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
            <PersonalLogin {...iconProps} />
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
