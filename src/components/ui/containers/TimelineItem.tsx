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
  const [isExpanded, setIsExpanded] = useState(isCurrent)

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

  if (!item.body && !item.items?.length) {
    return null
  }

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
          {!!item.body && <HtmlContent content={item.body} />}
          {item.items?.map(({title, body}) => (
            <Fragment key={title}>
              {!!title && (
                <Title
                  level="h5"
                  text={title}
                />
              )}
              {!!body && <HtmlContent content={body} />}
            </Fragment>
          ))}
        </Accordion>
      </View>
      <View style={styles.line} />
    </View>
  )
}
