import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {routes} from '../../app/navigation/routes'
import {ImagePicker} from '../../components/features/create-notification/ImagePicker'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../../components/features/form'
import {
  Box,
  Button,
  Label,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {TextInput} from '../../components/ui/forms'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {SettingsContext} from '../../providers'
import {NewProjectWarning} from '../../types'
import {NotificationStackParams} from './CreateNotificationScreen'
import {
  selectProjectId,
  setProjectWarning,
  setStep,
} from './notificationDraftSlice'

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
  navigation: StackNavigationProp<NotificationStackParams, 'ProjectWarningForm'>
}

export const ProjectWarningFormScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const projectId = useSelector(selectProjectId)
  const {settings} = useContext(SettingsContext)
  const projectManagerSettings = settings?.['project-manager']

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
    const warningData: NewProjectWarning = {
      title: data.title,
      body: {
        preface: data.intro,
        content: data.message,
      },
      project_identifier: projectId!,
      project_manager_id: projectManagerSettings?.id!,
    }
    dispatch(setProjectWarning(warningData))
    navigation.navigate('SelectMainImage')
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(2))
    })
    return focusListener
  }, [dispatch, navigation])

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountIntro(watchIntro?.length)
  }, [watchIntro])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  if (!projectId || !projectManagerSettings?.id) {
    return null
  }

  return (
    <ScrollView grow>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Schrijf een nieuwsartikel" />
            <Column gutter="sm">
              <Title level={4} text="Schrijftips voor een nieuwsartikel" />
              <Row align="start">
                <Button
                  onPress={() => navigation.navigate(routes.writingGuide.name)}
                  text="Toon schrijftips"
                />
              </Row>
            </Column>
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Titel nieuwsartikel"
                      label="Titel nieuwsartikel"
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
                      accessibilityLabel="Korte inleiding"
                      label="Korte inleiding"
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
                <CharactersLeftDisplay
                  charactersLeft={maxCharacters.intro - characterCountIntro}
                />
              </Column>
              {errors.intro && <ValidationWarning warning="Type een intro" />}
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
                      accessibilityLabel="Tekst nieuwsartikel"
                      label="Tekst nieuwsartikel"
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
                <CharactersLeftDisplay
                  charactersLeft={maxCharacters.message - characterCountMessage}
                />
              </Column>
              {errors.message && (
                <ValidationWarning warning="Type een nieuwsartikel" />
              )}
            </>
            <Column gutter="xs">
              <Row>
                <Label isAccessible text="Foto toevoegen " />
                <Text>(niet verplicht)</Text>
              </Row>
              <Text>
                Je kunt een foto toevoegen bij dit bericht. Deze komt bovenaan
                het bericht te staan. Wanneer je geen foto toevoegd dan
                gebruiken we een standaard afbeelding.
              </Text>
              <ImagePicker />
            </Column>
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
            <SubmitButton onPress={handleSubmit(onSubmit)} text="Afbeelding" />
          </Row>
        </Box>
      </Column>
    </ScrollView>
  )
}
