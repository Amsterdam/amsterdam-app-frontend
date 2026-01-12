import type {PollingStation} from '@/modules/elections/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {parseState} from '@/modules/elections/utils/parseState'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  pollingStation: PollingStation
}

export const PollingStationCrowdStatus = ({pollingStation}: Props) => {
  const {label, icon, color, time, available} = parseState(pollingStation)

  return (
    <Column gutter="xs">
      <Title
        level="h4"
        text="Drukte nu"
      />
      <Column gutter="no">
        <Row gutter="sm">
          <Icon
            color={color}
            name={icon}
            size="lg"
          />
          <Phrase>{label}</Phrase>
        </Row>
        {!!available && !!time && (
          <Phrase color="secondary">
            Laatste update{' '}
            {formatTimeToDisplay(time, {
              includeHoursLabel: true,
            })}
          </Phrase>
        )}
      </Column>
    </Column>
  )
}
