import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Row, Screen} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {WritingGuide} from '@/modules/construction-work-editor/components'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'
import {useTheme} from '@/themes'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

export const WritingGuideScreen = ({navigation}: Props) => {
  const {color} = useTheme()

  return (
    <Screen
      stickyHeader={
        <Row align="end">
          <Box>
            <IconButton
              accessibilityLabel="Sluiten"
              icon={
                <Icon size={20}>
                  <Close fill={color.text.default} />
                </Icon>
              }
              onPress={navigation.goBack}
            />
          </Box>
        </Row>
      }>
      <WritingGuide navigation={navigation} />
    </Screen>
  )
}
