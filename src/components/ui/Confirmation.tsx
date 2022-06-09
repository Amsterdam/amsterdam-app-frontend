import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '../../modules/projects/screens/create-notification/routes'
import {Column, Gutter, Row} from './layout'
import {Button, Card, CardBody, Text, Title} from '.'

type Props = {
  body: string
  button: {
    onPress: 'goBack' | 'popModal'
    text: string
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
    <Card>
      <CardBody>
        {icon}
        <Gutter height="lg" />
        <Column gutter="md">
          <Title text={title} />
          <Text>{body}</Text>
          <Row>
            <Button
              onPress={() => {
                if (button.onPress === 'goBack') {
                  navigation.goBack()
                }
                if (button.onPress === 'popModal') {
                  navigation.getParent()?.goBack()
                }
              }}
              text={button.text}
            />
          </Row>
        </Column>
      </CardBody>
    </Card>
  )
}
