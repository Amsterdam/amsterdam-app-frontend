import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {View} from 'react-native'
import {Box, SubmitButton, TextButton} from '../../components/ui'
import {Column, Gutter, Row, ScrollView} from '../../components/ui/layout'
import {NotificationContext, NotificationStackParams} from '.'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'SelectHeaderImage'>
}

export const SelectHeaderImageScreen = ({navigation}: Props) => {
  const notificationContext = useContext(NotificationContext)
  const {handleSubmit} = useForm()
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(3)
    })
    return focusListener
  }, [navigation, notificationContext])

  const onSubmit = () => {
    navigation.navigate('VerifyNotification')
  }

  return (
    <ScrollView grow>
      <Column align="between">
        <View />
        <Box>
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              onPress={navigation.goBack}
              text="Vorige"
            />
            <SubmitButton onPress={handleSubmit(onSubmit)} text="Controleer" />
          </Row>
          <Gutter height="xl" />
        </Box>
      </Column>
    </ScrollView>
  )
}
