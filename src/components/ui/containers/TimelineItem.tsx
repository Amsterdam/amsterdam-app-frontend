import React, {useState} from 'react'
import {View} from 'react-native'
import {Accordion, Box} from '@/components/ui/containers'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Article, Title} from '@/components/ui/text'
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

  const itemHasContent = item.content.some(c => c.body?.html || c.body?.text)

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <View style={styles.indicator}>
          {item.progress === 'Afgelopen' && (
            <Icon color="inverse" name="checkmark" size="sm" />
          )}
        </View>
        {itemHasContent ? (
          <Accordion
            key={item.title}
            title={item.title}
            initiallyExpanded={isCurrent}
            onChangeExpanded={state => setIsExpanded(state)}>
            {item.content.map(c => (
              <React.Fragment key={c.title}>
                <Article content={c.body.html} />
              </React.Fragment>
            ))}
          </Accordion>
        ) : (
          <Row flex={1}>
            <Box>
              <Title color="link" level="h5" text={item.title} />
            </Box>
          </Row>
        )}
      </View>
      <View style={styles.line} />
    </View>
  )
}
