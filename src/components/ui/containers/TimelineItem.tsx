import React, {useState} from 'react'
import {View} from 'react-native'
import {Accordion} from '@/components/ui/containers'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Icon} from '@/components/ui/media'
import {Article} from '@/components/ui/text'
import {useTheme} from '@/themes'
import {TimelineItem as TimelineItemType} from '@/types'

type Props = {
  isFirst?: boolean
  isLast?: boolean
  item: TimelineItemType
}

export const TimelineItem = ({isFirst, isLast, item}: Props) => {
  const isCurrent = !item.collapsed
  const [isExpanded, setIsExpanded] = useState(isCurrent)

  const theme = useTheme()
  const styles = timelineStyles(theme, isCurrent, isExpanded, isFirst, isLast)

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <View style={styles.indicator}>
          {item.progress === 'Afgelopen' && (
            <Icon color="inverse" name="checkmark" size="sm" />
          )}
        </View>
        <Accordion
          key={item.title}
          title={item.title + item.title}
          initialExpansionState={isCurrent}
          onExpansionStateChange={state => setIsExpanded(state)}>
          {item.content.map(c => (
            <React.Fragment key={c.title}>
              <Article content={c.body.html} />
            </React.Fragment>
          ))}
        </Accordion>
      </View>
      <View style={styles.line} />
    </View>
  )
}
