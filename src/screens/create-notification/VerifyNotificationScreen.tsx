import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
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
import {Column, Gutter, Row, ScrollView} from '../../components/ui/layout'
import {
  useAddNotificationMutation,
  useAddProjectWarningMutation,
} from '../../services'
import {NotificationQueryArg} from '../../types'
import {
  selectNewsArticle,
  selectNotification,
  selectProject,
  selectProjectWarning,
  setResponseStatus,
  setStep,
} from './notificationDraftSlice'
import {NotificationStackParams} from './'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'VerifyNotification'>
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const newsArticle = useSelector(selectNewsArticle)
  const notification = useSelector(selectNotification)
  const project = useSelector(selectProject)
  const projectWarning = useSelector(selectProjectWarning)
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
    if (projectWarning) {
      await addWarning(projectWarning)
      setWarningSent(true)
    }
  }

  const sendNotificationToBackend = useCallback(
    (
      articleIdentifier: Pick<
        NotificationQueryArg,
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
    if (newsArticle?.id) {
      sendNotificationToBackend({news_identifier: newsArticle.id})
    }

    if (projectWarning) {
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
      dispatch(setStep(4))
    })
    return focusListener
  }, [dispatch, navigation])

  useEffect(() => {
    if (addNotificationResponse) {
      dispatch(setResponseStatus('success'))
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, addNotificationResponse]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (addWarningIsError) {
      dispatch(setResponseStatus('failure'))
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, addWarningIsError]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (addNotificationIsError) {
      dispatch(setResponseStatus('failure'))
      navigation.navigate('NotificationResponse')
    }
  }, [navigation, addNotificationIsError]) // eslint-disable-line react-hooks/exhaustive-deps

  if (addWarningIsLoading || addNotificationIsLoading) {
    return <PleaseWait />
  }

  return (
    <ScrollView grow>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Controleer" />
            <SingleSelectable>
              <Text>Project</Text>
              {project && <Title level={2} text={project.title} />}
            </SingleSelectable>
            {notification && (
              <>
                <Preview label="Pushbericht">
                  <Title level={2} text={notification.title} />
                  <Text>{notification.body}</Text>
                </Preview>
              </>
            )}
            {newsArticle && (
              <Preview label="Nieuwsartikel">
                <Text>{newsArticle.title}</Text>
              </Preview>
            )}
            {projectWarning && (
              <Preview label="Nieuwsartikel">
                <Title level={2} text={projectWarning.title} />
                <Text intro>{projectWarning.body.preface}</Text>
                <Text>{projectWarning.body.content}</Text>
              </Preview>
            )}
          </Column>
        </Box>
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
      </Column>
    </ScrollView>
  )
}
