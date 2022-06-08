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
  customAspectRatio?: number
} & Omit<ImageRNProps, 'style'>

export const Image = ({
  aspectRatio,
  customAspectRatio,
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({aspectRatio, customAspectRatio}),
    [aspectRatio, customAspectRatio],
  )
  const styles = useThemable(createdStyles)

  return <ImageRN style={styles.image} {...otherProps} />
}

const createStyles =
  ({aspectRatio, customAspectRatio}: Partial<Props>) =>
  ({image}: Theme) =>
    StyleSheet.create({
      image: {
        maxWidth: '100%',
        aspectRatio:
          customAspectRatio ?? image.aspectRatio[aspectRatio ?? 'default'],
        resizeMode: 'cover',
      },
    })
