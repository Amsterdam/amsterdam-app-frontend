import {Fragment, useState} from 'react'
import {View} from 'react-native'
import {Accordion} from '@/components/ui/containers/Accordion'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Icon} from '@/components/ui/media/Icon'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useTheme} from '@/themes/useTheme'
import {TimelineItem as TimelineItemType} from '@/types/timeline'

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
  const {fontScale} = useDeviceContext()
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
            <Icon
              color="inverse"
              name="checkmark"
              size="sm"
            />
          )}
        </View>
        <Accordion
          grow
          initiallyExpanded={!!isCurrent}
          key={item.title}
          onChangeExpanded={state => setIsExpanded(state)}
          title={item.title}>
          {itemHasContent
            ? item.content.map(({title, body: {html}}) => (
                <Fragment key={title}>
                  <Title
                    level="h5"
                    text={title}
                  />
                  <HtmlContent content={html} />
                </Fragment>
              ))
            : undefined}
        </Accordion>
      </View>
      <View style={styles.line} />
    </View>
  )
}
