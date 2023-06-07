import {forwardRef, useCallback, useEffect, useImperativeHandle} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import ImageCropPicker, {
  Options as ImageCropPickerOptions,
} from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '@/components/ui/buttons'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {TextInputField} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {useSentry} from '@/hooks'
import {
  selectCurrentProjectId,
  selectMainImageDescription,
  selectMessage,
  setMainImage,
  setMainImageDescription,
  setMessage,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {NewMessage} from '@/modules/construction-work-editor/types'
import {setAlert} from '@/store'

const maxCharacters = {
  title: 100,
  body: 500,
}

type FormData = {
  body: string
  title: string
}

type Props = {
  onMainImageSelected: () => void
}

const imageCropPickerOptions: ImageCropPickerOptions = {
  cropperCancelText: 'Annuleren',
  cropperChooseText: 'Kiezen',
  cropping: true,
  height: 1080,
  includeBase64: true,
  mediaType: 'photo',
  width: 1920,
}

const getAddPhotoFeedback = (code: string, viaCamera = false) => {
  if (['E_NO_CAMERA_PERMISSION', 'E_NO_LIBRARY_PERMISSION'].includes(code)) {
    return `Sorry, je kunt geen foto ${
      viaCamera ? 'maken' : 'toevoegen'
    }, omdat de app geen toestemming heeft om je ${
      viaCamera ? 'camera' : 'fotobibliotheek'
    } te gebruiken.`
  }
  return `Sorry, er is iets misgegaan. De app kan geen gebruik maken van je ${
    viaCamera ? 'camera' : 'fotobibliotheek'
  }.`
}

export const MessageForm = forwardRef(({onMainImageSelected}: Props, ref) => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  const currentProjectId = useSelector(selectCurrentProjectId)
  const selectedMessage = useSelector(selectMessage(currentProjectId))
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )

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

  const pickImage =
    (viaCamera = false) =>
    (data: FormData) => {
      ImageCropPicker[viaCamera ? 'openCamera' : 'openPicker'](
        imageCropPickerOptions,
      )
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
        .catch((error: {code: string}) => {
          const {code} = error
          // Picker or camera action cancelled by the user, all good
          if (code === 'E_PICKER_CANCELLED') {
            return
          }
          dispatch(
            setAlert({
              closeType: AlertCloseType.withoutButton,
              content: {
                text: getAddPhotoFeedback(code, viaCamera),
              },
              variant: AlertVariant.negative,
              withIcon: false,
            }),
          )
          sendSentryErrorLog(
            viaCamera
              ? 'Taking photo failed'
              : 'Picking image from device failed',
            'MessageForm.tsx',
            {error, viaCamera},
          )
        })

      saveMessage(data)
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
          <TextInputField
            label="Wat is de titel van je bericht?"
            maxCharacters={maxCharacters.title}
            name="title"
            numberOfLines={3}
            placeholder="Voer een titel in …"
            rules={{
              maxLength: {
                value: maxCharacters.title,
                message: 'Het maximum aantal tekens is bereikt',
              },
              required: 'Vul een titel in',
            }}
          />
          <TextInputField
            label="Wat is de tekst van je bericht?"
            maxCharacters={maxCharacters.body}
            name="body"
            numberOfLines={7}
            placeholder="Voer een tekst in …"
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
              Je kunt een foto toevoegen bij dit bericht. Deze wordt liggend
              uitgesneden en komt bovenaan het bericht te staan. Wanneer je geen
              foto toevoegt dan gebruiken we een standaard afbeelding.
            </Paragraph>
            <Row align="start">
              <Button
                iconName="enlarge"
                label="Foto toevoegen"
                onPress={handleSubmit(pickImage())}
                variant="secondary"
              />
            </Row>
            <Row align="start">
              <Button
                iconName="enlarge"
                label="Foto maken"
                onPress={handleSubmit(pickImage(true))}
                variant="secondary"
              />
            </Row>
          </Column>
        </Column>
      </Column>
    </FormProvider>
  )
})
