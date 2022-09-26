import {ImageAspectRatioTokens} from '_themes/tokens'
import React, {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  aspectRatio?: keyof ImageAspectRatioTokens
  height?: number
} & ViewProps

/**
 * Horizontally centers a media object.
 * Applies the aspect ratio and height to the object.
 */
export const Figure = ({
  aspectRatio = 'default',
  height,
  children,
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({aspectRatio, height}),
    [aspectRatio, height],
  )
  const styles = useThemable(createdStyles)

  return (
    <View {...otherProps} style={styles.figure}>
      <View style={styles.image}>{children}</View>
    </View>
  )
}

const createStyles =
  ({
    aspectRatio,
    height,
  }: Required<Pick<Props, 'aspectRatio'>> & Pick<Props, 'height'>) =>
  ({media}: Theme) =>
    StyleSheet.create({
      figure: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      image: {
        maxWidth: '100%',
        minHeight: height,
        aspectRatio: media.aspectRatio[aspectRatio],
      },
    })
