import {StyleSheet, View} from 'react-native'
import {ProgressStatus} from '@/components/ui/progressSteps/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  progressStatus: ProgressStatus
  progressStatusNextItem?: ProgressStatus
  variant: 'primary' | 'secondary'
}

export const ProgressStepConnector = ({
  progressStatus,
  progressStatusNextItem,
  variant,
}: Props) => {
  const theme = useTheme()
  const {fontScale} = useDeviceContext()
  const styles = createStyles(
    theme,
    fontScale,
    progressStatus,
    progressStatusNextItem,
    variant,
  )

  return (
    <View
      style={styles.container}
      testID="ProgressStepConnector"
    />
  )
}

const createStyles = (
  {color, size, z}: Theme,
  fontScale: number,
  status: ProgressStatus,
  statusNext: Props['progressStatusNextItem'],
  variant: Props['variant'],
) => {
  const scaledIndicatorSize = size.progressSteps[variant].indicator * fontScale
  const scaledLineWidth = size.progressSteps[variant].line * fontScale

  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: scaledIndicatorSize,
      left: (scaledIndicatorSize - scaledLineWidth) / 2,
      zIndex: z.progressStepConnector,
      width: scaledLineWidth,
      height: '100%',
      backgroundColor: statusNext
        ? color.progressSteps[variant][statusNext].background
        : color.progressSteps[variant][status].background,
    },
  })
}
