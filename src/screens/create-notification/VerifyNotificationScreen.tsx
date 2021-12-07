import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  Box,
  Preview,
  SingleSelectable,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {
  Column,
  Gutter,
  Row,
  ScrollView,
  Stretch,
} from '../../components/ui/layout'
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {size} from '../../tokens'
import {NewNotification, Notification, WarningResponse} from '../../types'
import {encryptWithAES} from '../../utils'
import {NotificationContext, NotificationStackParamList} from './'

type Props = {
  navigation: StackNavigationProp<
    NotificationStackParamList,
    'VerifyNotification'
  >
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const notificationContext = useContext(NotificationContext)
  const {
    changeResponseStatus,
    newsDetails,
    notification,
    projectDetails,
    projectManagerSettings,
    warning,
  } = notificationContext
  const [authToken, setAuthToken] = useState<string>()
  const [hasWarningSent, setHasWarningSent] = useState(false)

  const handleAuthToken = useCallback(() => {
    try {
      if (!projectManagerSettings?.id) {
        throw 'Project-manager id is missing'
      }
      setAuthToken(
        encryptWithAES({
          password: '6886b31dfe27e9306c3d2b553345d9e5',
          plaintext: projectManagerSettings?.id,
        }),
      )
    } catch (e) {
      console.log(e)
    }
  }, [projectManagerSettings?.id])

  useEffect(() => {
    handleAuthToken()
  }, [handleAuthToken])

  const warningApi = useFetch<WarningResponse>({
    url: getEnvironment().apiUrl + '/project/warning',
    options: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        UserAuthorization: authToken!,
      }),
    },
    onLoad: false,
  })

  const notificationApi = useFetch<Notification>({
    url: getEnvironment().apiUrl + '/notification',
    options: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        UserAuthorization: authToken!,
      }),
    },
    onLoad: false,
  })

  const sendWarningToBackend = async () => {
    await warningApi.fetchData(undefined, JSON.stringify(warning))
  }

  const sendNotificationToBackend = (
    articleIdentifier: Pick<
      NewNotification,
      'news_identifier' | 'warning_identifier'
    >,
  ) => {
    notificationApi.fetchData(
      undefined,
      JSON.stringify({
        ...notification,
        articleIdentifier,
      }),
    )
  }

  const handleSubmit = async () => {
    if (warning) {
      await sendWarningToBackend()
      setHasWarningSent(true)
    } else if (notification && newsDetails?.id) {
      sendNotificationToBackend({news_identifier: newsDetails.id})
    }
  }

  useEffect(() => {
    if (notification && hasWarningSent && warningApi.data?.warning_identifier) {
      sendNotificationToBackend({
        warning_identifier: warningApi.data.warning_identifier,
      })
    }
  }, [hasWarningSent]) // eslint-disable-line react-hooks/exhaustive-deps

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
    if (warningApi.hasError) {
      changeResponseStatus('failure')
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, warningApi.hasError]) // eslint-disable-line react-hooks/exhaustive-deps

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
          <Column gutter="lg">
            <Title text="Controleer" />
            <SingleSelectable>
              <Text>Project</Text>
              <Title level={2} text={projectDetails.title} />
            </SingleSelectable>
            {notification && (
              <>
                <Preview label="Pushbericht">
                  <Title level={2} text={notification.title} />
                  <Text>{notification.body}</Text>
                </Preview>
              </>
            )}
            {newsDetails && (
              <Preview label="Nieuwsartikel">
                <Text>{newsDetails.title}</Text>
              </Preview>
            )}
            {warning && (
              <Preview label="Nieuwsartikel">
                <Title level={2} text={warning.title} />
                <Text intro>{warning.body.preface}</Text>
                <Text>{warning.body.content}</Text>
              </Preview>
            )}
          </Column>
        </Box>
      </Stretch>
      <Box>
        <Row align="between" valign="center">
          <TextButton
            direction="backward"
            emphasis
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
