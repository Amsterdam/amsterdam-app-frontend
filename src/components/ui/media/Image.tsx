import React, {useMemo} from 'react'
import {
  Image as ImageRN,
  ImageProps as ImageRNProps,
  StyleSheet,
} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {ImageAspectRatioTokens} from '../../../themes/tokens'

type Props = {
  aspectRatio?: keyof ImageAspectRatioTokens
} & Omit<ImageRNProps, 'style'>

export const Image = ({aspectRatio, ...otherProps}: Props) => {
  const createdStyles = useMemo(() => createStyles(aspectRatio), [aspectRatio])
  const styles = useThemable(createdStyles)

  return <ImageRN style={styles.image} {...otherProps} />
}

const createStyles =
  (ratio?: keyof ImageAspectRatioTokens) =>
  ({image}: Theme) =>
    StyleSheet.create({
      image: {
        maxWidth: '100%',
        aspectRatio: image.aspectRatio[ratio ?? 'default'],
        resizeMode: 'cover',
      },
    })
