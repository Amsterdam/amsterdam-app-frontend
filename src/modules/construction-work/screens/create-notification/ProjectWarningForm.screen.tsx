import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import ImageCropPicker from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import {Box, Label, Text, Title} from '@/components/ui'
import {Button, SubmitButton, TextButton} from '@/components/ui/buttons'
import {
  CharactersLeftDisplay,
  TextInput,
  ValidationWarning,
} from '@/components/ui/forms'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {selectProjectManager} from '@/modules/construction-work-editor/slice'
import {
  selectMainImage,
  selectProjectId,
  setMainImage,
  setMainImageDescription,
  setProjectWarning,
  setStep,
} from '@/modules/construction-work/screens/create-notification/notificationDraftSlice'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'
import {NewProjectWarning} from '@/modules/construction-work/types'
import {useTheme} from '@/themes'

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
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

const config = {maxWidth: 1920, maxHeight: 1080}

export const ProjectWarningFormScreen = ({navigation}: Props) => {
  const {color} = useTheme()

  const {id: projectManagerId} = useSelector(selectProjectManager)
  const dispatch = useDispatch()
  const mainImage = useSelector(selectMainImage)
  const projectId = useSelector(selectProjectId)

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
  } = useForm<FormData>()

  const watchTitle = watch('title')
  const watchIntro = watch('intro')
  const watchMessage = watch('message')

  const addProjectWarningToStore = (data: FormData) => {
    const warningData: NewProjectWarning = {
      title: data.title,
      body: {
        preface: data.intro,
        content: data.message,
      },
      project_identifier: projectId!,
      project_manager_id: projectManagerId,
    }
    dispatch(setProjectWarning(warningData))
  }

  const onSubmitForm: SubmitHandler<FormData> = data => {
    addProjectWarningToStore(data)
    dispatch(setMainImageDescription('placeholder tekst'))
    navigation.navigate(CreateNotificationRouteName.verifyNotification)
  }

  const pickImage = (data: FormData) => {
    addProjectWarningToStore(data)
    ImageCropPicker.openPicker({
      cropperCancelText: 'Annuleren',
      cropperChooseText: 'Kiezen',
      cropping: true,
      height: config.maxHeight,
      includeBase64: true,
      mediaType: 'photo',
      width: config.maxWidth,
    }).then(image => {
      dispatch(setMainImage(image))
    })
  }

  useEffect(() => {
    mainImage &&
      navigation.navigate(CreateNotificationRouteName.verifyMainImage)
  }, [mainImage, navigation])

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(setStep(2))
    })
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

  if (!projectId || !projectManagerId) {
    return null
  }

  return (
    <Screen>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Schrijf een nieuwsartikel" />
            <Column gutter="sm">
              <Title level={4} text="Schrijftips voor een nieuwsartikel" />
              <Row align="start">
                <Button
                  label="Toon schrijftips"
                  onPress={() =>
                    navigation.navigate(
                      CreateNotificationRouteName.writingGuide,
                    )
                  }
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
                      warning={!!errors.title}
                    />
                  )}
                  name="title"
                  defaultValue=""
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.title - (characterCountTitle || 0)
                  }
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
                      warning={!!errors.intro}
                    />
                  )}
                  name="intro"
                  defaultValue=""
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.intro - (characterCountIntro || 0)
                  }
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
                      warning={!!errors.message}
                    />
                  )}
                  name="message"
                  defaultValue=""
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.message - (characterCountMessage || 0)
                  }
                />
              </Column>
              {errors.message && (
                <ValidationWarning warning="Type een nieuwsartikel" />
              )}
            </>
            <Column gutter="xs">
              <Row valign="baseline">
                <Label isAccessible text="Foto toevoegen " />
                <Text>(niet verplicht)</Text>
              </Row>
              <Column gutter="md">
                <Text>
                  Je kunt een foto toevoegen bij dit artikel. Deze komt bovenaan
                  het artikel te staan. Wanneer je geen foto toevoegt dan
                  gebruiken we een standaard afbeelding.
                </Text>
                <Row align="start">
                  <Button
                    icon={
                      <Icon size={24}>
                        <Enlarge fill={color.pressable.default.background} />
                      </Icon>
                    }
                    label="Foto’s toevoegen"
                    onPress={handleSubmit(pickImage)}
                    variant="secondary"
                  />
                </Row>
              </Column>
            </Column>
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
            <SubmitButton
              label="Controleer"
              onPress={handleSubmit(onSubmitForm)}
            />
          </Row>
        </Box>
      </Column>
    </Screen>
  )
}
