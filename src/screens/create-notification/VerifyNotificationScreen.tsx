import {AUTH_TOKEN, PROJECT_MANAGER_TOKEN} from '@env'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
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
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {color, size} from '../../tokens'
import {NewNotification, Notification, WarningResponse} from '../../types'
import {encrypter} from '../../utils/encrypter'
import {NotificationContext, NotificationStackParamList} from '.'

type Props = {
  navigation: StackNavigationProp<
    NotificationStackParamList,
    'VerifyNotification'
  >
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const [token, setToken] = useState<string>('')
  const notificationContext = useContext(NotificationContext)
  const {
    changeResponseStatus,
    newsDetails,
    notification,
    projectDetails,
    warning,
  } = notificationContext
  const [notificationToSend, setNotificationToSend] =
    useState<NewNotification>()

  const warningApi = useFetch<WarningResponse>({
    url: getEnvironment().apiUrl + '/project/warning',
    options: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        UserAuthorization: token,
      }),
      body: JSON.stringify(warning),
    },
    onLoad: false,
  })

  const notificationApi = useFetch<Notification>({
    url: getEnvironment().apiUrl + '/notification',
    options: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        UserAuthorization: token,
      }),
      body: JSON.stringify(notificationToSend),
    },
    onLoad: false,
  })

  const handleSubmit = async () => {
    !token &&
      setToken(
        encrypter({
          mode: 'encrypt',
          password: AUTH_TOKEN,
          plaintext: PROJECT_MANAGER_TOKEN,
        }),
      )
  }

  useEffect(() => {
    if (warning) {
      warningApi.fetchData(warning)
    }
    if (notification && newsDetails) {
      setNotificationToSend({
        ...notification,
        news_identifier: newsDetails.id,
      })
    }
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (notification) {
      const warningIdentifier = warningApi.data?.warning_identifier
      setNotificationToSend({
        ...notification,
        warning_identifier: warningIdentifier,
      })
    }
  }, [warningApi.data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    notificationToSend && notificationApi.fetchData(notificationToSend)
  }, [notificationToSend]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(3)
    })
    return focusListener
  }, [navigation, notificationContext])

  useEffect(() => {
    if (notificationApi.data) {
      changeResponseStatus('success')
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, notificationApi.data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (notificationApi.hasError) {
      changeResponseStatus('failure')
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, notificationApi.hasError]) // eslint-disable-line react-hooks/exhaustive-deps

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
        <Row align="between" valign="center">
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
