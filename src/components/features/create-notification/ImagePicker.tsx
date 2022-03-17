import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import RNImageCropPicker from 'react-native-image-crop-picker'
import {useDispatch} from 'react-redux'
import {setMainImage} from '../../../screens/create-notification/notificationDraftSlice'
import {color, size} from '../../../tokens'
import {Button} from '../../ui'

export const ImagePicker = ({
  isSubmitSuccessful,
  onSubmitForm,
}: {
  isSubmitSuccessful: boolean
  onSubmitForm: () => {}
}) => {
  const dispatch = useDispatch()

  const pickImage = () => {
    onSubmitForm()
  }

  useEffect(() => {
    console.log('render')
    isSubmitSuccessful &&
      RNImageCropPicker.openPicker({
        cropperChooseText: 'Kiezen',
        cropperCancelText: 'Annuleren',
        cropperRotateButtonsHidden: true,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo',
        width: size.warningMainPhoto.maxWidth,
        height: size.warningMainPhoto.maxHeight,
      }).then(image => {
        dispatch(setMainImage(image))
      })
  }, [isSubmitSuccessful])

  return (
    <View style={styles.container}>
      <Button
        icon={<Enlarge style={styles.icon} />}
        onPress={pickImage}
        text="Foto's toevoegen"
        variant="inverse"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    fill: color.font.primary,
  },
})
