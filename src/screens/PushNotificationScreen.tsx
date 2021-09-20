import React, {useEffect, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {Platform} from 'react-native'
import {
  Box,
  Button,
  Gutter,
  ScreenWrapper,
  Text,
  TextInput,
  Title,
} from '../components/ui'
import {size} from '../tokens'

const maxCharacters = {
  title: 54,
  message: 123,
}

export const PushNotificationScreen = () => {
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
  const onSubmit = data => console.log(data)

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  return (
    <ScreenWrapper background="lighter">
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
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Zet hier duidelijk het onderwerp van de push notificatie in."
              maxLength={maxCharacters.title}
              multiline={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
          defaultValue=""
        />
        <Gutter height={size.spacing.xs} />
        <Text secondary>
          U kunt nog {maxCharacters.title - characterCountTitle} letters of
          tekens typen.
        </Text>
        {errors.title && (
          <Text accessibilityRole="alert" warning>
            Vul een titel in
          </Text>
        )}
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
              minHeight={Platform.OS === 'ios' ? 82 : undefined}
              multiline={true}
              numberOfLines={Platform.OS === 'ios' ? undefined : 3}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="message"
          defaultValue=""
        />
        <Gutter height={size.spacing.xs} />
        <Text secondary>
          U kunt nog {maxCharacters.message - characterCountMessage} letters of
          tekens typen.
        </Text>
        {errors.message && (
          <Text accessibilityRole="alert" warning>
            Type een bericht
          </Text>
        )}
        <Gutter height={size.spacing.md} />
        <Button text="Verzend" onPress={handleSubmit(onSubmit)} />
      </Box>
    </ScreenWrapper>
  )
}
