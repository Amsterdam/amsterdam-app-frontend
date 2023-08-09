import ImageCropPicker, {
  Options as ImageCropPickerOptions,
} from 'react-native-image-crop-picker'
import {useDispatch} from 'react-redux'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {useSentry} from '@/hooks/sentry/useSentry'
import {setAlert} from '@/store/slices/alert'
import {getPropertyFromMaybeError} from '@/utils/object'

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

const PERMISSION_ERRORS: ImageCropPickerError[] = [
  ImageCropPickerError.E_NO_CAMERA_PERMISSION,
  ImageCropPickerError.E_NO_LIBRARY_PERMISSION,
]

const getAddPhotoFeedback = (
  viaCamera = false,
  code?: ImageCropPickerError,
) => {
  if (code && PERMISSION_ERRORS.includes(code)) {
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

      return Promise.resolve(result)
    } catch (error) {
      const code = getPropertyFromMaybeError<ImageCropPickerError>(
        error,
        'code',
      )

      // Picker or camera action was cancelled by the user, all good
      if (code === ImageCropPickerError.E_PICKER_CANCELLED) {
        return
      }

      dispatch(
        setAlert({
          closeType: AlertCloseType.withoutButton,
          content: {
            text: getAddPhotoFeedback(viaCamera, code),
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
