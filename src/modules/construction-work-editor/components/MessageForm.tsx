import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {useCallback, useEffect} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import ImageCropPicker from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import {FormField} from '@/components/features/FormField'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {useSentry} from '@/hooks'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {
  selectMainImage,
  selectProjectId,
  setMainImage,
  setMainImageDescription,
  setProjectWarning,
} from '@/modules/construction-work/screens/create-notification'
import {NewProjectWarning} from '@/modules/construction-work/types'
import {useTheme} from '@/themes'

const maxCharacters = {
  title: 100,
  message: 500,
}

type FormData = {
  title: string
  message: string
}

type Props = {
  isSubmitButtonPressed: boolean
  onFormSubmitted: () => void
  onMainImageSelected: () => void
}

const config = {maxWidth: 1920, maxHeight: 1080}

export const MessageForm = ({
  onFormSubmitted,
  onMainImageSelected,
  isSubmitButtonPressed,
}: Props) => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()
  const projectId = useSelector(selectProjectId)
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const mainImage = useSelector(selectMainImage)

  const {color} = useTheme()

  const form = useForm<FormData>()
  const {formState, getValues, handleSubmit} = form

  const saveMessage = useCallback(
    (data: FormData) => {
      if (projectId && constructionWorkEditorId) {
        const warningData: NewProjectWarning = {
          title: data.title,
          body: data.message,
          project_identifier: projectId,
          project_manager_id: constructionWorkEditorId,
        }
        dispatch(setProjectWarning(warningData))
      }
    },
    [constructionWorkEditorId, dispatch, projectId],
  )

  const pickImage = (data: FormData) => {
    saveMessage(data)
    ImageCropPicker.openPicker({
      cropperCancelText: 'Annuleren',
      cropperChooseText: 'Kiezen',
      cropping: true,
      height: config.maxHeight,
      includeBase64: true,
      mediaType: 'photo',
      width: config.maxWidth,
    })
      .then(image => {
        dispatch(setMainImage(image))
        dispatch(setMainImageDescription('placeholder tekst'))
      })
      .catch((error: unknown) => {
        sendSentryErrorLog(
          'Picking image from device failed',
          'MessageForm.tsx',
          {error},
        )
      })
  }

  const onSubmitForm: SubmitHandler<FormData> = useCallback(
    data => {
      if (!formState.isValid) {
        return
      }
      saveMessage(data)
      dispatch(setMainImageDescription('placeholder tekst'))
      onFormSubmitted()
    },
    [dispatch, formState, onFormSubmitted, saveMessage],
  )

  useEffect(() => {
    if (isSubmitButtonPressed) {
      onSubmitForm(getValues())
    }
  }, [formState, getValues, isSubmitButtonPressed, onSubmitForm])

  useEffect(() => {
    mainImage && onMainImageSelected()
  }, [mainImage, onMainImageSelected])

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="md">
          <FormField
            label="Titel nieuwsartikel"
            maxCharacters={maxCharacters.title}
            numberOfLines={3}
            name="title"
            placeholder="Voer een titel in..."
            requiredErrorMessage="Vul een titel in"
          />
          <FormField
            label="Wat is de tekst van je bericht?"
            maxCharacters={maxCharacters.message}
            name="message"
            numberOfLines={7}
            placeholder="Voer een tekst in..."
            requiredErrorMessage="Vul een tekst in"
          />
        </Column>
        <Column gutter="xs">
          <Row valign="baseline">
            <Title text="Foto toevoegen " />
            <Paragraph>(niet verplicht)</Paragraph>
          </Row>
          <Column gutter="md">
            <Paragraph>
              Je kunt een foto toevoegen bij dit bericht. Deze komt bovenaan het
              bericht te staan. Wanneer je geen foto toevoegt dan gebruiken we
              een standaard afbeelding.
            </Paragraph>
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
    </FormProvider>
  )
}
