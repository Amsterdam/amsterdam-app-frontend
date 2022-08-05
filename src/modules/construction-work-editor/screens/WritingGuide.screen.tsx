import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Screen} from '@/components/ui/layout'
import {WritingGuide} from '@/modules/construction-work-editor/components'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

export const WritingGuideScreen = ({navigation}: Props) => (
  <Screen>
    <WritingGuide navigation={navigation} />
  </Screen>
)
