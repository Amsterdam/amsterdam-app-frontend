import React, {useMemo} from 'react'
import {
  Image as ImageRN,
  ImageProps as ImageRNProps,
  StyleSheet,
} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ImageAspectRatioTokens} from '@/themes/tokens'

type ImageProps = {
  aspectRatio?: keyof ImageAspectRatioTokens
  customAspectRatio?: number
}

type Props = ImageProps & Omit<ImageRNProps, 'style'>

export const Image = ({
  aspectRatio = 'default',
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
  ({
    aspectRatio,
    customAspectRatio,
  }: ImageProps & Required<Pick<ImageProps, 'aspectRatio'>>) =>
  ({media}: Theme) =>
    StyleSheet.create({
      image: {
        width: undefined,
        maxWidth: '100%',
        height: undefined,
        flex: 1,
        aspectRatio: customAspectRatio ?? media.aspectRatio[aspectRatio],
        resizeMode: 'cover',
      },
    })
