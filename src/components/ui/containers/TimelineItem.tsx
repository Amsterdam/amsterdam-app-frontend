import {pascalCase} from 'pascal-case'
import {Fragment, useState} from 'react'
import {View} from 'react-native'
import {Accordion} from '@/components/ui/containers/Accordion'
import {timelineStyles} from '@/components/ui/containers/timelineStyles'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
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
      <Row>
        <View style={styles.indicator}>
          {item.progress === 'Afgelopen' && (
            <Icon
              color="inverse"
              name="check-mark"
              size="sm"
              testID={`${testID}Icon`}
            />
          )}
        </View>
        <Accordion
          grow={1}
          initiallyExpanded={!!isCurrent}
          isExpandable={!!item.body || !!item.items?.length}
          key={item.title}
          onChangeExpanded={state => setIsExpanded(state)}
          shrink={1}
          testID={testID}
          title={item.title}>
          {!!item.body && (
            <HtmlContent
              content={item.body}
              testID={`${testID}BodyHtmlContent`}
            />
          )}
          {item.items?.map(({title, body}) => (
            <Fragment key={title}>
              {!!title && (
                <Title
                  level="h5"
                  text={title}
                />
              )}
              {!!body && (
                <HtmlContent
                  content={body}
                  testID={`${testID}ItemBody${pascalCase(title ?? body ?? '')}HtmlContent`}
                />
              )}
            </Fragment>
          ))}
        </Accordion>
      </Row>
      <View style={styles.line} />
    </View>
  )
}
