import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  CharactersLeftDisplay,
  FormButtons,
  ValidationWarning,
} from '../../components/features/form'
import {
  Box,
  Gutter,
  ScrollView,
  SubmitButton,
  TextInput,
  Title,
} from '../../components/ui'
import {Stretch} from '../../components/ui/Layout/Stretch'
import {size} from '../../tokens'
import {NewNotification} from '../../types'
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

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()

  const watchTitle = watch('title')
  const watchMessage = watch('message')

  const onSubmit = (data: FormData) => {
    const notificationData: NewNotification = {
      title: data.title,
      body: data.message,
      project_id: notificationContext.projectDetails.id!,
    }
    const nextScreen =
      notificationContext.projectDetails.news.length > 0
        ? 'SelectNewsArticle'
        : 'WarningForm'

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
          <Title text="Schrijf een notificatie" />
          <Gutter height={size.spacing.xs} />
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
            defaultValue=""
          />
          <Gutter height={size.spacing.xs} />
          <CharactersLeftDisplay
            charactersLeft={maxCharacters.title - characterCountTitle}
          />
          {errors.title && <ValidationWarning warning="Vul een titel in" />}
          <Gutter height={size.spacing.lg} />
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
            defaultValue=""
          />
          <Gutter height={size.spacing.xs} />
          <CharactersLeftDisplay
            charactersLeft={maxCharacters.message - characterCountMessage}
          />
          {errors.message && <ValidationWarning warning="Type een bericht" />}
          <Gutter height={size.spacing.md} />
        </Box>
      </Stretch>
      <Box>
        <FormButtons>
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            text="Kies een bericht"
          />
        </FormButtons>
        <Gutter height={size.spacing.xl} />
      </Box>
    </ScrollView>
  )
}
