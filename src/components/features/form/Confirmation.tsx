import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {size} from '../../../tokens'
import {Button, Card, CardBody, Text, Title} from '../../ui'
import {Gutter} from '../../ui/layout'

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
    useNavigation<StackNavigationProp<RootStackParamList, 'Notification'>>()

  return (
    <Card>
      <CardBody>
        {icon}
        <Gutter height={size.spacing.lg} />
        <Title text={title} />
        <Gutter height={size.spacing.sm} />
        <Text>{body}</Text>
        <Gutter height={size.spacing.md} />
        <View style={styles.button}>
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
        </View>
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
  },
})
