import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  CharactersLeftDisplay,
  FormButtons,
  ValidationWarning,
} from '../../components/features/form'
import {Box, Button, Gutter, Link, TextInput, Title} from '../../components/ui'
import {size} from '../../tokens'
import {NewWarning} from '../../types/warning'
import {
  PushNotificationContext,
  PushNotificationStackParamList,
} from './CreateNotificationScreen'

const maxCharacters = {
  title: 50,
  intro: 150,
  message: 500,
}

type FormData = {
  title: string
  intro: string
  message: string
}

type Props = {
  navigation: StackNavigationProp<PushNotificationStackParamList, 'WarningForm'>
}

export const WarningFormScreen = ({navigation}: Props) => {
  const pushNotificationContext = useContext(PushNotificationContext)
  const {changeWarning} = pushNotificationContext

  const [characterCountTitle, setCharacterCountTitle] = useState<number>(
    maxCharacters.title,
  )
  const [characterCountIntro, setCharacterCountIntro] = useState<number>(
    maxCharacters.intro,
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
  const watchIntro = watch('intro')
  const watchMessage = watch('message')

  const onSubmit = (data: FormData) => {
    const warningData: NewWarning = {
      title: data.title,
      body: {
        preface: data.intro,
        content: data.message,
      },
      project_id: pushNotificationContext.projectId!,
    }
    changeWarning(warningData)
  }

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountIntro(watchIntro?.length)
  }, [watchIntro])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  return (
    <Box>
      <Title text="Schrijf een bericht" />
      <Gutter height={size.spacing.xs} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Titel nieuwsbericht"
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
            label="Intro nieuwsbericht"
            maxLength={maxCharacters.intro}
            multiline={true}
            numberOfLines={3}
            onChangeText={onChange}
            value={value}
            warning={errors.intro}
          />
        )}
        name="intro"
        defaultValue=""
      />
      <Gutter height={size.spacing.xs} />
      <CharactersLeftDisplay
        charactersLeft={maxCharacters.intro - characterCountIntro}
      />
      {errors.intro && <ValidationWarning warning="Type een introbericht" />}
      <Gutter height={size.spacing.md} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Tekst nieuwsbericht"
            maxLength={maxCharacters.message}
            multiline={true}
            numberOfLines={5}
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
      {errors.message && <ValidationWarning warning="Type een nieuwsbericht" />}
      <Gutter height={size.spacing.md} />
      <FormButtons>
        <Link direction="backward" onPress={navigation.goBack} text="Vorige" />
        <Button
          onPress={handleSubmit(onSubmit)}
          text="Controleer"
          variant="next"
        />
      </FormButtons>
    </Box>
  )
}
