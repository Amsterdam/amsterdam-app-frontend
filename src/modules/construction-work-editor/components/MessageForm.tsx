import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import ImageCropPicker from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import {FormField} from '@/components/features/FormField'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {useSentry} from '@/hooks'
import {
  setMessage,
  setMainImage,
  setMainImageDescription,
  selectMainImageDescription,
  selectMessage,
  selectCurrentProjectId,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {NewMessage} from '@/modules/construction-work-editor/types'
import {useTheme} from '@/themes'

const maxCharacters = {
  title: 100,
  body: 500,
}

type FormData = {
  title: string
  body: string
}

type Props = {
  onMainImageSelected: () => void
}

const config = {maxWidth: 1920, maxHeight: 1080}

export const MessageForm = forwardRef(({onMainImageSelected}: Props, ref) => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()
  const currentProjectId = useSelector(selectCurrentProjectId)
  const selectedMessage = useSelector(selectMessage(currentProjectId))
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )

  const {color} = useTheme()

  const form = useForm<FormData>()

  const {handleSubmit, setValue} = form

  useEffect(() => {
    setValue('title', selectedMessage?.title ?? '')
    setValue('body', selectedMessage?.body ?? '')
  }, [selectedMessage, setValue])

  const saveMessage = useCallback(
    (data: FormData) => {
      if (currentProjectId && constructionWorkEditorId) {
        const message: NewMessage = {
          title: data.title,
          body: data.body,
          project_identifier: currentProjectId,
          project_manager_id: constructionWorkEditorId,
        }
        dispatch(setMessage({projectId: currentProjectId, message}))
      }
    },
    [constructionWorkEditorId, dispatch, currentProjectId],
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
      .then(mainImage => {
        dispatch(setMainImage({projectId: currentProjectId, mainImage}))
        !mainImageDescription &&
          dispatch(
            setMainImageDescription({
              projectId: currentProjectId,
              mainImageDescription: undefined,
            }),
          )
        onMainImageSelected()
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
      saveMessage(data)
      !mainImageDescription &&
        dispatch(
          setMainImageDescription({
            projectId: currentProjectId,
            mainImageDescription: undefined,
          }),
        )
    },
    [dispatch, mainImageDescription, currentProjectId, saveMessage],
  )

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: (onSuccess: () => void) =>
        handleSubmit((...args) => {
          onSubmitForm(...args)
          onSuccess()
        })(),
    }),
    [handleSubmit, onSubmitForm],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="md">
          <FormField
            label="Titel nieuwsartikel"
            maxCharacters={maxCharacters.title}
            numberOfLines={3}
            name="title"
            placeholder="Voer een titel in…"
            rules={{
              maxLength: {
                value: maxCharacters.title,
                message: 'Het maximum aantal tekens is bereikt',
              },
              required: 'Vul een titel in',
            }}
          />
          <FormField
            label="Wat is de tekst van je bericht?"
            maxCharacters={maxCharacters.body}
            name="body"
            numberOfLines={7}
            placeholder="Voer een tekst in…"
            rules={{
              maxLength: {
                value: maxCharacters.body,
                message: 'Het maximum aantal tekens is bereikt',
              },
              required: 'Vul een tekst in',
            }}
          />
        </Column>
        <Column gutter="xs">
          <Row valign="baseline">
            <Title text="Foto toevoegen" />
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
})
