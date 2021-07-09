import React from 'react'
import {Image as ImageRN, ImageProps, StyleSheet} from 'react-native'

export const Image = (props: ImageProps) => {
  return <ImageRN style={[styles.image, props.style]} {...props} />
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
})
