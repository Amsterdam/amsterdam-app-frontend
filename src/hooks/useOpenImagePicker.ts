import ImageCropPicker, {
  Options as ImageCropPickerOptions,
} from 'react-native-image-crop-picker'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

import {useAlert} from '@/store/slices/alert'
import {getPropertyFromMaybeError} from '@/utils/object'

const DEFAULT_OPTIONS: ImageCropPickerOptions = {
  cropperCancelText: 'Annuleren',
  cropperChooseText: 'Kiezen',
  cropping: true,
  height: 1080,
  includeBase64: false,
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
 * Returns a function, which depending on the viaCamera param will open an image picker or the device camera. Any relevant errors are logged and communicated via an alert. Errors do not have to be handled further (you can use the `void` keyword).
 */
export const useOpenImagePicker = (
  options?: Partial<ImageCropPickerOptions>,
) => {
  const {setAlert} = useAlert()
  const trackException = useTrackException()

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

      setAlert({
        text: getAddPhotoFeedback(viaCamera, code),
        testID: 'OpenImagePicker',
        variant: AlertVariant.negative,
        hasIcon: false,
      })

      trackException(
        viaCamera
          ? ExceptionLogKey.takingPhotoFailed
          : ExceptionLogKey.pickingImageFailed,
        'useOpenImagePicker.ts',
        {error, code, viaCamera},
      )
    }
  }
}
