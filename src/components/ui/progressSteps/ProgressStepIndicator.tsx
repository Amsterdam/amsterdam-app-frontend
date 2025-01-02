import {StyleSheet, Text, View} from 'react-native'
import {Icon} from '@/components/ui/media/Icon'
import {
  ProgressStatus,
  ProgressStepsVariant,
} from '@/components/ui/progressSteps/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  numberIndicator?: number
  progressStatus: ProgressStatus
  variant: ProgressStepsVariant
}

export const ProgressStepIndicator = ({
  progressStatus,
  numberIndicator,
  variant,
}: Props) => {
  const theme = useTheme()
  const {fontScale} = useDeviceContext()
  const styles = createStyles(theme, fontScale, progressStatus, variant)

  return (
    <View
      style={styles.indicator}
      testID="ProgressStepIndicator">
      {progressStatus === 'done' && (
        <Icon
          color="inverse"
          name="check-mark"
          size={variant === 'primary' ? 'sm' : 'md'}
          testID="ProgressStepIndicatorDoneIcon"
        />
      )}
      {!!numberIndicator && progressStatus !== 'done' && (
        <Text
          style={styles.text}
          testID="ProgressStepIndicatorNumberIndicator">
          {numberIndicator}
        </Text>
      )}
    </View>
  )
}

const createStyles = (
  {color, size, text}: Theme,
  fontScale: number,
  status: Props['progressStatus'],
  variant: Props['variant'],
) => {
  const scaledIndicatorSize = size.progressSteps[variant].indicator * fontScale

  return StyleSheet.create({
    indicator: {
      width: scaledIndicatorSize,
      height: scaledIndicatorSize,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.progressSteps[variant][status].background,
      borderWidth: variant === 'secondary' ? 2 : undefined,
      borderColor:
        'border' in color.progressSteps[variant][status]
          ? color.progressSteps[variant][status].border
          : undefined,
      borderRadius: scaledIndicatorSize / 2,
    },
    text: {
      alignSelf: 'center',
      color:
        status === 'upcoming'
          ? color.progressSteps.secondary.upcoming.color
          : color.progressSteps.secondary.current.color,
      fontFamily: text.fontFamily.bold,
      fontSize: text.fontSize.h5,
    },
  })
}
