import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {Box} from '_components/ui'
import {Button, IconButton} from '_components/ui/buttons'
import {Icon} from '_components/ui/media'
import {ScreenTitle} from '_components/ui/text'
import React, {SVGProps} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Row, Screen} from '@/components/ui/layout'
import {WritingGuide} from '@/modules/construction-work-editor/components'
import {ConstructionWorkEditorModalName} from '@/modules/construction-work-editor/routes'
import {Theme, useThemable} from '@/themes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorModalName.writingGuide
  >
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorModalName.writingGuide
  >
}

export const WritingGuideScreen = ({navigation, route}: Props) => {
  const iconProps = useThemable(createIconProps)

  return (
    <Screen
      stickyHeader={
        <Box>
          <Row align="between" valign="end">
            <View style={styles.balanceCenterAlignment} />
            <ScreenTitle text={route.params.projectTitle} />
            <IconButton
              accessibilityLabel="Sluiten"
              icon={
                <Icon size={20}>
                  <Close {...iconProps} />
                </Icon>
              }
              onPress={navigation.goBack}
            />
          </Row>
        </Box>
      }
      stickyFooter={
        <Box>
          <Button label="Aan de slag!" onPress={navigation.goBack} />
        </Box>
      }>
      <WritingGuide />
    </Screen>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})

const styles = StyleSheet.create({
  balanceCenterAlignment: {
    width: 20,
  },
})
