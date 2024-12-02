import {StyleSheet, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenHeaderTitle} from '@/components/ui/text/ScreenHeaderTitle'
import {IconSize, TestProps} from '@/components/ui/types'
import {useResetNavigationStack} from '@/hooks/navigation/useResetNavigationStack'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  navigationResetIndex?: number
  navigationResetRouteName?: string
  title: string
} & Required<Pick<TestProps, 'testID'>>

const closeIconSize = 'ml'

export const ModalHeader = ({
  navigationResetIndex,
  navigationResetRouteName,
  testID,
  title,
}: Props) => {
  const {isLandscape, isTablet} = useDeviceContext()
  const styles = useThemable(createStyles)
  const resetNavigationStack = useResetNavigationStack(
    navigationResetIndex,
    navigationResetRouteName,
  )

  return (
    <Box
      insetHorizontal="md"
      insetVertical={isLandscape && !isTablet ? 'sm' : 'md'}>
      <Row
        align="between"
        gutter="md">
        <View style={styles.balanceCenterAlignment} />
        <View style={styles.nudgeVerticalAlignment}>
          <ScreenHeaderTitle text={title} />
        </View>
        <IconButton
          accessibilityLabel="Sluiten"
          accessibilityLanguage="nl-NL"
          icon={
            <Icon
              color="link"
              name="close"
              size={closeIconSize}
              testID={`${testID}Icon`}
            />
          }
          onPress={resetNavigationStack}
          testID={`${testID}CloseButton`}
        />
      </Row>
    </Box>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    balanceCenterAlignment: {
      width: IconSize[closeIconSize],
    },
    nudgeVerticalAlignment: {
      flexShrink: 1,
      marginTop: size.spacing.xs,
    },
  })
