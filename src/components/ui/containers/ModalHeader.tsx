import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {IconButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {ScreenTitle} from '@/components/ui/text'
import {IconSize, TestProps} from '@/components/ui/types'
import {DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'

type Props = {
  title: string
} & TestProps

const closeIconSize = 'ml'

export const ModalHeader = ({testID, title}: Props) => {
  const {isLandscape, isTablet} = useContext(DeviceContext)
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const styles = useThemable(createStyles)

  return (
    <Box
      insetHorizontal="md"
      insetVertical={isLandscape && !isTablet ? 'sm' : 'md'}>
      <Row align="between" gutter="md">
        <View style={styles.balanceCenterAlignment} />
        <View style={styles.nudgeVerticalAlignment}>
          <ScreenTitle text={title} />
        </View>
        <IconButton
          accessibilityLabel="Sluiten"
          icon={<Icon color="link" name="close" size={closeIconSize} />}
          onPress={navigation.goBack}
          testID={[testID, 'CloseButton'].join('')}
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
