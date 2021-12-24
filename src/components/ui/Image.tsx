import React from 'react'
import {Image as ImageRN, ImageProps, StyleSheet} from 'react-native'
import {image} from '../../tokens'

export const Image = (props: ImageProps) => {
  return <ImageRN style={[styles.image, props.style]} {...props} />
}

const styles = StyleSheet.create({
  image: {
    maxWidth: '100%',
    aspectRatio: image.aspectRatio.default,
    flex: 1,
  },
})
