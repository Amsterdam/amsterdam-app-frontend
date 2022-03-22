import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Image as ImageType} from 'react-native-image-crop-picker'
import {color, image as imageToken} from '../../../tokens'
import {Image} from '../../ui'

type Props = {
  image: ImageType
  onPress: () => void
}

export const ImagePreviewTouchable = ({image, onPress}: Props) => {
  return (
    <View>
      <Image source={{uri: image.path}} />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onPress}
          style={styles.button}>
          <TrashBin style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 62,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  icon: {
    width: 26,
    height: 32,
    fill: color.font.inverse,
  },
  placeholder: {
    aspectRatio: imageToken.aspectRatio.wide,
  },
})
