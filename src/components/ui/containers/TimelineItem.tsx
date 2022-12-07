import React, {useContext, useState} from 'react'
import {View} from 'react-native'
import {Accordion} from '@/components/ui/containers'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Icon} from '@/components/ui/media'
import {Article} from '@/components/ui/text'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'
import {TimelineItem as TimelineItemType} from '@/types'

type Props = {
  isBeforeUpcoming: boolean
  isLast: boolean
  item: TimelineItemType
}

export const TimelineItem = ({isBeforeUpcoming, isLast, item}: Props) => {
  const isCurrent = !item.collapsed
  const itemHasContent = item.content.some(c => c.body?.html || c.body?.text)
  const [isExpanded, setIsExpanded] = useState(isCurrent && itemHasContent)

  const theme = useTheme()
  const {fontScale} = useContext(DeviceContext)
  const styles = timelineStyles(
    theme,
    fontScale,
    isBeforeUpcoming,
    item.progress === 'Aankomend',
    isExpanded,
    isLast,
  )

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.indicator}>
          {item.progress === 'Afgelopen' && (
            <Icon color="inverse" name="checkmark" size="sm" />
          )}
        </View>
        <Accordion
          initiallyExpanded={!!isCurrent}
          key={item.title}
          onChangeExpanded={state => setIsExpanded(state)}
          title={item.title}>
          {itemHasContent
            ? item.content.map(({title, body: {html}}) => (
                <Article content={html} key={title} />
              ))
            : undefined}
        </Accordion>
      </View>
      <View style={styles.line} />
    </View>
  )
}
