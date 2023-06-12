import ImageCropPicker, {
  Options as ImageCropPickerOptions,
} from 'react-native-image-crop-picker'
import {useDispatch} from 'react-redux'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {useSentry} from '@/hooks/useSentry'
import {setAlert} from '@/store'

const DEFAULT_OPTIONS: ImageCropPickerOptions = {
  cropperCancelText: 'Annuleren',
  cropperChooseText: 'Kiezen',
  cropping: true,
  height: 1080,
  includeBase64: true,
  mediaType: 'photo',
  width: 1920,
}

enum ImageCropPickerError {
  E_NO_CAMERA_PERMISSION = 'E_NO_CAMERA_PERMISSION',
  E_NO_LIBRARY_PERMISSION = 'E_NO_LIBRARY_PERMISSION',
  E_PICKER_CANCELLED = 'E_PICKER_CANCELLED',
}

enum ImageCropPickerCustomError {
  E_NO_RESULT = 'E_NO_RESULT',
}

const permissionErrors: (ImageCropPickerError | ImageCropPickerCustomError)[] =
  [
    ImageCropPickerError.E_NO_CAMERA_PERMISSION,
    ImageCropPickerError.E_NO_LIBRARY_PERMISSION,
  ]

const getAddPhotoFeedback = (
  code: ImageCropPickerError | ImageCropPickerCustomError,
  viaCamera = false,
) => {
  if (permissionErrors.includes(code)) {
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

/**
 * Returns a function, which depending on the viaCamera param will open an image picker or the device camera. Any relevant errors are logged to Sentry and communicated via an alert. Errors do not have to be handled further (you can use the `void` keyword).
 */
export const useOpenImagePicker = (
  options?: Partial<ImageCropPickerOptions>,
) => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  return async (viaCamera = false) => {
    try {
      const result = await ImageCropPicker[
        viaCamera ? 'openCamera' : 'openPicker'
      ]({
        ...DEFAULT_OPTIONS,
        ...options,
      })
      if (!result) {
        throw new Error('NO_RESULT')
      }

      return Promise.resolve(result)
    } catch (error) {
      const {code} = error as {
        code: ImageCropPickerError | ImageCropPickerCustomError
      }
      // Picker or camera action was cancelled by the user, all good
      if (code === ImageCropPickerError.E_PICKER_CANCELLED) {
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
        viaCamera ? 'Taking photo failed' : 'Picking image from device failed',
        'useOpenImagePicker.ts',
        {error, code, viaCamera},
      )
    }
  }
}
