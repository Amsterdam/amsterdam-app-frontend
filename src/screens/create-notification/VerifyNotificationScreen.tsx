import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  Box,
  PleaseWait,
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
import {
  useAddNotificationMutation,
  useAddProjectWarningMutation,
} from '../../services'
import {DraftNotification} from '../../types'
import {NotificationContext, NotificationStackParams} from './'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'VerifyNotification'>
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const notificationContext = useContext(NotificationContext)
  const {
    changeResponseStatus,
    newsDetails,
    notification,
    projectDetails,
    warning,
  } = notificationContext
  const [isWarningSent, setWarningSent] = useState(false)
  const [
    addWarning,
    {
      data: addWarningResponse,
      isError: addWarningIsError,
      isLoading: addWarningIsLoading,
    },
  ] = useAddProjectWarningMutation()
  const [
    addNotification,
    {
      data: addNotificationResponse,
      error: addNotificationIsError,
      isLoading: addNotificationIsLoading,
    },
  ] = useAddNotificationMutation()

  const sendWarningToBackend = async () => {
    if (warning) {
      await addWarning(warning)
      setWarningSent(true)
    }
  }

  const sendNotificationToBackend = useCallback(
    (
      articleIdentifier: Pick<
        DraftNotification,
        'news_identifier' | 'warning_identifier'
      >,
    ) => {
      notification &&
        addNotification({
          ...notification,
          ...articleIdentifier,
        })
    },
    [addNotification, notification],
  )

  const handleSubmit = async () => {
    if (newsDetails?.id) {
      sendNotificationToBackend({news_identifier: newsDetails.id})
    }

    if (warning) {
      await sendWarningToBackend()
    }
  }

  useEffect(() => {
    isWarningSent &&
      addWarningResponse &&
      sendNotificationToBackend({
        warning_identifier: addWarningResponse.warning_identifier,
      })
  }, [addWarningResponse, isWarningSent, sendNotificationToBackend])

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(3)
    })
    return focusListener
  }, [navigation, notificationContext])

  useEffect(() => {
    if (addNotificationResponse) {
      changeResponseStatus('success')
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, addNotificationResponse]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (addWarningIsError) {
      changeResponseStatus('failure')
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, addWarningIsError]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (addNotificationIsError) {
      changeResponseStatus('failure')
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, addNotificationIsError]) // eslint-disable-line react-hooks/exhaustive-deps

  if (addWarningIsLoading || addNotificationIsLoading) {
    return <PleaseWait />
  }

  return (
    <ScrollView grow>
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
        <Gutter height="xl" />
      </Box>
    </ScrollView>
  )
}
