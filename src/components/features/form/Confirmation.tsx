import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {MenuStackParamList} from '../../../App/navigation'
import {size} from '../../../tokens'
import {Button, Card, CardBody, Text, Title} from '../../ui'
import {Column, Gutter, Row} from '../../ui/layout'

type Props = {
  body: string
  button: {
    onPress: 'goBack' | 'popModal'
    text: string
  }
  icon: React.ReactElement
  title: string
}

export const Confirmation = ({body, button, icon, title}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'Notification'>>()

  return (
    <Card>
      <CardBody>
        {icon}
        <Gutter height={size.spacing.lg} />
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
