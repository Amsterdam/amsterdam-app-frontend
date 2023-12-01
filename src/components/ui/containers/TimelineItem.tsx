import {Fragment, useState} from 'react'
import {View} from 'react-native'
import {Accordion} from '@/components/ui/containers/Accordion'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Icon} from '@/components/ui/media/Icon'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ProjectDetailTimelineItem} from '@/modules/construction-work/types/api'
import {useTheme} from '@/themes/useTheme'

type Props = {
  isBeforeUpcoming: boolean
  isLast: boolean
  item: ProjectDetailTimelineItem
}

export const TimelineItem = ({isBeforeUpcoming, isLast, item}: Props) => {
  const isCurrent = !item.collapsed
  const itemHasContent = !!item.body && !!item.items
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
          {!!itemHasContent &&
            item.items.map(({title, body}) => (
              <Fragment key={title}>
                <Title
                  level="h5"
                  text={title}
                />
                <HtmlContent content={body} />
              </Fragment>
            ))}
        </Accordion>
      </View>
      <View style={styles.line} />
    </View>
  )
}
