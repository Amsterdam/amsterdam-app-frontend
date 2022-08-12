import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {ScreenTitle} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  title: string
}

const closeIconSize = 20

export const ModalHeader = ({title}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const iconProps = useThemable(createIconProps)

  return (
    <Box>
      <Row align="between" valign="end">
        <View style={styles.balanceCenterAlignment} />
        <ScreenTitle text={title} />
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

const styles = StyleSheet.create({
  balanceCenterAlignment: {
    width: closeIconSize,
  },
})
