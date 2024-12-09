import {View, StyleSheet, Text} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  isCurrent: boolean
  isDone: boolean
  isLast?: boolean
  numberIndicator: number
  text: string
  title: string
}

export const LoginItem = ({
  isCurrent,
  isDone,
  isLast = false,
  numberIndicator,
  text,
  title,
}: Props) => {
  const theme = useTheme()
  const {fontScale} = useDeviceContext()
  const styles = createStyles(theme, fontScale, isCurrent, isDone, isLast)

  return (
    <View>
      <Row gutter="md">
        <View style={styles.indicator}>
          {isDone ? (
            <Icon
              color="inverse"
              name="check-mark"
              testID="CityPassLoginItemDoneIcon"
            />
          ) : (
            <Text style={styles.text}>{numberIndicator}</Text>
          )}
        </View>
        <Column shrink={1}>
          <Title
            color={!isDone && !isCurrent ? 'secondary' : 'default'}
            level="h4"
            text={title}
          />
          <Paragraph color={!isDone && !isCurrent ? 'secondary' : 'default'}>
            {text}
          </Paragraph>
        </Column>
      </Row>
      {!isLast && <Gutter height="xl" />}
      <View style={styles.line} />
    </View>
  )
}

const createStyles = (
  {color, text, z}: Theme,
  fontScale: number,
  isCurrent: boolean,
  isDone: boolean,
  isLast: boolean,
) => {
  const indicatorSize = 30 * fontScale
  const lineWidth = 2 * fontScale

  return StyleSheet.create({
    indicator: {
      width: indicatorSize,
      height: indicatorSize,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDone
        ? color.timeline.background.done.secondary
        : isCurrent
          ? color.timeline.background.current
          : color.timeline.background.upcoming.secondary,
      borderWidth: 2,
      borderColor: isDone
        ? color.timeline.border.done.secondary
        : isCurrent
          ? color.timeline.border.current
          : color.timeline.border.upcoming,
      borderRadius: indicatorSize / 2,
    },
    line: {
      position: 'absolute',
      top: indicatorSize,
      left: (indicatorSize - lineWidth) / 2,
      zIndex: z.timelineLine,
      width: lineWidth,
      height: isLast ? 0 : '100%',
      backgroundColor: isDone
        ? color.timeline.background.done.secondary
        : color.timeline.background.upcoming.primary,
    },
    text: {
      alignSelf: 'center',
      color:
        isCurrent || isDone
          ? color.timeline.color.current
          : color.timeline.color.upcoming,
      fontFamily: text.fontFamily.bold,
      fontSize: text.fontSize.h5,
    },
  })
}
