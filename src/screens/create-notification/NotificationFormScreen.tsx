import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  CharactersLeftDisplay,
  FormButtons,
  ValidationWarning,
} from '../../components/features/form'
import {Box, Button, Gutter, TextInput, Title} from '../../components/ui'
import {FullSpaceContainer} from '../../components/ui/Layout/FullSpaceContainer'
import {size} from '../../tokens'
import {NewNotification} from '../../types'
import {
  PushNotificationContext,
  PushNotificationStackParamList,
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
    PushNotificationStackParamList,
    'NotificationForm'
  >
}

export const NotificationFormScreen = ({navigation}: Props) => {
  const pushNotificationContext = useContext(PushNotificationContext)
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
      project_id: pushNotificationContext.projectDetails.projectId!,
    }
    pushNotificationContext.changeNotification(notificationData)
    navigation.navigate('SelectNewsArticle')
  }

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  return (
    <>
      <FullSpaceContainer>
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
      </FullSpaceContainer>
      <Box>
        <FormButtons>
          <Button
            onPress={handleSubmit(onSubmit)}
            text="Kies een bericht"
            variant="submit"
          />
        </FormButtons>
        <Gutter height={size.spacing.xl} />
      </Box>
    </>
  )
}
