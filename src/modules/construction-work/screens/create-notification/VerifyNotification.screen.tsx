import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import HeroImage from '@/assets/images/project-warning-hero.svg'
import {Box, Preview, SingleSelectable, Text, Title} from '@/components/ui'
import {SubmitButton, TextButton} from '@/components/ui/buttons'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
} from '@/modules/construction-work/construction-work.service'
import {
  selectMainImage,
  selectMainImageDescription,
  selectNewsArticle,
  selectNotification,
  selectProject,
  selectProjectWarning,
  setResponseStatus,
  setStep,
} from '@/modules/construction-work/screens/create-notification/notificationDraftSlice'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'
import {useAddNotificationMutation} from '@/services'
import {Theme, useThemable} from '@/themes'
import {NotificationQueryArg} from '@/types'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const mainImage = useSelector(selectMainImage)
  const mainImageDescription = useSelector(selectMainImageDescription)
  const newsArticle = useSelector(selectNewsArticle)
  const notification = useSelector(selectNotification)
  const project = useSelector(selectProject)
  const projectWarning = useSelector(selectProjectWarning)
  const [isWarningSent, setWarningSent] = useState(false)

  const [
    addWarning,
    {
      data: addWarningData,
      isError: addWarningIsError,
      isLoading: addWarningIsLoading,
    },
  ] = useAddProjectWarningMutation()

  const [addProjectWarningImage, {isError: addProjectWarningImageIsError}] =
    useAddProjectWarningImageMutation()

  const [
    addNotification,
    {
      data: addNotificationData,
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

  const handleSubmit = () => {
    if (newsArticle?.id) {
      sendNotificationToBackend({news_identifier: newsArticle.id})
    }

    if (projectWarning) {
      // eslint-disable-next-line no-void
      void sendWarningToBackend()
    }
  }

  useEffect(() => {
    if (addWarningData && isWarningSent && mainImage && mainImage.data) {
      // eslint-disable-next-line no-void
      void addProjectWarningImage({
        project_warning_id: addWarningData.warning_identifier,
        image: {
          main: true,
          description: mainImageDescription,
          data: mainImage.data,
        },
      })
    }
  }, [
    addWarningData,
    addProjectWarningImage,
    isWarningSent,
    mainImage,
    mainImageDescription,
  ])

  useEffect(() => {
    if (addWarningData && isWarningSent) {
      sendNotificationToBackend({
        warning_identifier: addWarningData.warning_identifier,
      })
    }
  }, [addWarningData, isWarningSent, sendNotificationToBackend])

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(3))
    })
    return focusListener
  }, [dispatch, navigation])

  useEffect(() => {
    if (addNotificationData) {
      dispatch(setResponseStatus('success'))
      navigation.navigate(CreateNotificationRouteName.notificationResponse)
    }
  }, [dispatch, navigation, addNotificationData])

  useEffect(() => {
    if (
      addNotificationIsError ||
      addProjectWarningImageIsError ||
      addWarningIsError
    ) {
      dispatch(setResponseStatus('failure'))
      navigation.navigate(CreateNotificationRouteName.notificationResponse)
    }
  }, [
    addNotificationIsError,
    addProjectWarningImageIsError,
    addWarningIsError,
    dispatch,
    navigation,
  ])

  const styles = useThemable(createStyles)

  if (addWarningIsLoading || addNotificationIsLoading) {
    return <PleaseWait />
  }

  const image = mainImage ? (
    <Image source={{uri: mainImage?.path}} />
  ) : (
    <View style={styles.placeholder}>
      <HeroImage />
    </View>
  )

  return (
    <Screen>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Controleer" />
            <SingleSelectable>
              <Text>Project</Text>
              {!!project && <Title level={2} text={project.title} />}
            </SingleSelectable>
            {!!notification && (
              <>
                <Preview label="Pushbericht">
                  <Title level={2} text={notification.title} />
                  <Text>{notification.body}</Text>
                </Preview>
              </>
            )}
            {!!newsArticle && (
              <Preview label="Nieuwsartikel">
                <Text>{newsArticle.title}</Text>
              </Preview>
            )}
            {!!projectWarning && (
              <Preview image={image} label="Nieuwsartikel">
                <Text>Omschrijving: {mainImageDescription}</Text>
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
              label="Vorige"
              onPress={navigation.goBack}
            />
            <SubmitButton onPress={handleSubmit} label="Verstuur" />
          </Row>
        </Box>
      </Column>
    </Screen>
  )
}

const createStyles = ({media}: Theme) =>
  StyleSheet.create({
    placeholder: {
      aspectRatio: media.aspectRatio.wide,
    },
  })
