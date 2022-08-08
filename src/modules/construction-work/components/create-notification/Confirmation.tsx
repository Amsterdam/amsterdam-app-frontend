import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {Box, Text, Title} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'

type Props = {
  body: string
  button: {
    label: string
    onPress: 'goBack' | 'popModal'
  }
  icon: ReactNode
  title: string
}

export const Confirmation = ({body, button, icon, title}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        CreateNotificationStackParams,
        CreateNotificationRouteName.notificationResponse
      >
    >()

  return (
    <Box>
      {icon}
      <Gutter height="lg" />
      <Column gutter="md">
        <Title text={title} />
        <Text>{body}</Text>
        <Row>
          <Button
            label={button.label}
            onPress={() => {
              if (button.onPress === 'goBack') {
                navigation.goBack()
              }
              if (button.onPress === 'popModal') {
                navigation.getParent()?.goBack()
              }
            }}
          />
        </Row>
      </Column>
    </Box>
  )
}
