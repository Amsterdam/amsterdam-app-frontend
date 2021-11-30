import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../../components/features/form'
import {Box, SubmitButton, Title} from '../../components/ui'
import {TextInput} from '../../components/ui/forms'
import {
  Column,
  Gutter,
  Row,
  ScrollView,
  Stretch,
} from '../../components/ui/layout'
import {size} from '../../tokens'
import {NewNotification} from '../../types'
import {formatTime} from '../../utils'
import {
  NotificationContext,
  NotificationStackParamList,
} from './CreateNotificationScreen'

const maxCharacters = {
  title: 54,
  message: 123,
}

type FormData = {
  title: string
  message: string
}

type Props = {
  navigation: StackNavigationProp<
    NotificationStackParamList,
    'NotificationForm'
  >
}

export const NotificationFormScreen = ({navigation}: Props) => {
  const notificationContext = useContext(NotificationContext)
  const [characterCountTitle, setCharacterCountTitle] = useState<number>(
    maxCharacters.title,
  )
  const [characterCountMessage, setCharacterCountMessage] = useState<number>(
    maxCharacters.message,
  )
  const now = Date.now()

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()

  const watchTitle = watch('title')
  const watchMessage = watch('message')

  const numberOfNewsArticles = notificationContext.projectDetails.articles
    ? notificationContext.projectDetails.articles.filter(
        article => article.type === 'news',
      ).length
    : 0

  const onSubmit = (data: FormData) => {
    const notificationData: NewNotification = {
      title: data.title,
      body: data.message,
      project_identifier: notificationContext.projectDetails.id!,
    }

    const nextScreen =
      numberOfNewsArticles > 0 ? 'SelectNewsArticle' : 'WarningForm'

    notificationContext.changeNotification(notificationData)
    navigation.navigate(nextScreen)
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(1)
    })
    return focusListener
  }, [navigation, notificationContext])

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  return (
    <ScrollView keyboardDismiss>
      <Stretch>
        <Box>
          <Column gutter="lg">
            <Title text="Schrijf een notificatie" />
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Wat is de titel van de notificatie?"
                      label="Wat is de titel van de notificatie?"
                      maxLength={maxCharacters.title}
                      multiline={true}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.title}
                    />
                  )}
                  name="title"
                  defaultValue={'TEST ' + formatTime(now) + ' '}
                />
                <CharactersLeftDisplay
                  charactersLeft={maxCharacters.title - characterCountTitle}
                />
              </Column>
              {errors.title && <ValidationWarning warning="Vul een titel in" />}
            </>
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Wat is de tekst van de notificatie?"
                      label="Wat is de tekst van de notificatie?"
                      maxLength={maxCharacters.message}
                      multiline={true}
                      numberOfLines={3}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.message}
                    />
                  )}
                  name="message"
                  defaultValue="Lorem ipsum dolor sit amet. We testen de notificaties van de Amsterdam app."
                />
                <CharactersLeftDisplay
                  charactersLeft={maxCharacters.message - characterCountMessage}
                />
              </Column>
              {errors.message && (
                <ValidationWarning warning="Type een bericht" />
              )}
            </>
          </Column>
        </Box>
      </Stretch>
      <Box>
        <Row align="end" valign="center">
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            text={
              numberOfNewsArticles ? 'Kies een bericht' : 'Schrijf een bericht'
            }
          />
        </Row>
        <Gutter height={size.spacing.xl} />
      </Box>
    </ScrollView>
  )
}
