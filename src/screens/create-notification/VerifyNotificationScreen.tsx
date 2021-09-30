import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {
  Box,
  Gutter,
  Row,
  ScrollView,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {Stretch} from '../../components/ui/Layout/Stretch'
import {Preview} from '../../components/ui/Preview'
import {color, size} from '../../tokens'
import {NotificationContext, NotificationStackParamList} from '.'

type Props = {
  navigation: StackNavigationProp<
    NotificationStackParamList,
    'VerifyNotification'
  >
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const notificationContext = useContext(NotificationContext)
  const {newsDetails, notification, projectDetails, warning} =
    notificationContext

  const handleSubmit = () => {
    console.log('submit')
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(3)
    })
    return focusListener
  }, [navigation, notificationContext])

  return (
    <ScrollView keyboardDismiss>
      <Stretch>
        <Box>
          <Title margin text="Controleer" />
          <Text secondary>Project</Text>
          <Title level={2} text={projectDetails.title} />
          <Gutter height={size.spacing.md} />
          {notification && (
            <>
              <Preview label="Pushbericht">
                <Title level={2} text={notification.title} />
                <Gutter height={size.spacing.sm} />
                <Text>{notification.body}</Text>
              </Preview>
              <Gutter height={size.spacing.md} />
            </>
          )}
          {newsDetails && (
            <>
              <Text secondary>Nieuwsbericht</Text>
              <Gutter height={size.spacing.sm} />
              <View style={styles.newsTitle}>
                <Text>
                  Nieuwsbericht 2 met een hele lange uitgebreide titel
                </Text>
              </View>
              <Gutter height={size.spacing.md} />
            </>
          )}
          {warning && (
            <Preview label="Nieuwsbericht">
              <Title level={2} text={warning.title} />
              <Gutter height={size.spacing.sm} />
              <Text intro>{warning.body.preface}</Text>
              <Gutter height={size.spacing.sm} />
              <Text>{warning.body.content}</Text>
            </Preview>
          )}
        </Box>
      </Stretch>
      <Box>
        <Row align="end-or-between" valign="center">
          <TextButton
            direction="backward"
            onPress={navigation.goBack}
            text="Vorige"
          />
          <SubmitButton onPress={handleSubmit} text="Verstuur" />
        </Row>
        <Gutter height={size.spacing.xl} />
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  newsTitle: {
    paddingVertical: size.spacing.md,
    borderColor: color.border.input,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})
