import {RouteProp} from '@react-navigation/core'
import React, {useEffect, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {RootStackParamList} from '../../App'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../components/features/form'
import {Box, Button, Gutter, TextInput, Title} from '../components/ui'
import {size} from '../tokens'
import {NewNotification} from '../types/notification'

const maxCharacters = {
  title: 54,
  message: 123,
}

type PushNotificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'PushNotification'
>

type Props = {
  route: PushNotificationScreenRouteProp
}

type FormData = {
  title: string
  message: string
}

export const PushNotificationScreen = ({route}: Props) => {
  const {projectId} = route.params
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
      project_id: projectId,
    }
    console.log(notificationData)
  }

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  return (
    <Box>
      <Title text="Schrijf een pushnotificatie" />
      <Gutter height={size.spacing.xs} />
      <Title level={2} text="Wat is de titel van de pushnotificatie?" />
      <Gutter height={size.spacing.xs} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Zet hier duidelijk het onderwerp van de push notificatie in."
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
      <Title level={2} text="Wat is de tekst van de pushnotificatie?" />
      <Gutter height={size.spacing.xs} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Vertel hier in een paar zinnen wat de situatie is."
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
      <Button
        onPress={handleSubmit(onSubmit)}
        text="Kies een bericht"
        variant="next"
      />
    </Box>
  )
}
