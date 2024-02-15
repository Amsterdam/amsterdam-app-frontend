import {Fragment, useState} from 'react'
import {View} from 'react-native'
import {Accordion} from '@/components/ui/containers/Accordion'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Icon} from '@/components/ui/media/Icon'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ProjectTimelineItem} from '@/modules/construction-work/types/api'
import {useTheme} from '@/themes/useTheme'

type Props = {
  isBeforeUpcoming: boolean
  isLast: boolean
  item: ProjectTimelineItem
} & TestProps

export const TimelineItem = ({
  isBeforeUpcoming,
  isLast,
  item,
  testID,
}: Props) => {
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
          isExpandable={!!item.body || !!item.items?.length}
          key={item.title}
          onChangeExpanded={state => setIsExpanded(state)}
          testID={testID}
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
