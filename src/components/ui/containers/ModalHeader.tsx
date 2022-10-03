import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps, useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Close} from '@/assets/icons'
import {IconButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {ScreenTitle} from '@/components/ui/text'
import {DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'

type Props = {
  title: string
}

const closeIconSize = 20

export const ModalHeader = ({title}: Props) => {
  const {isLandscape, isTablet} = useContext(DeviceContext)
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const iconProps = useThemable(createIconProps)
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
          icon={
            <Icon size={closeIconSize}>
              <Close {...iconProps} />
            </Icon>
          }
          onPress={navigation.goBack}
        />
      </Row>
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    balanceCenterAlignment: {
      width: closeIconSize,
    },
    nudgeVerticalAlignment: {
      flexShrink: 1,
      marginTop: size.spacing.xs,
    },
  })
