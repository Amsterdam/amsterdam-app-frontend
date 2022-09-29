import {ImageAspectRatioTokens} from '_themes/tokens'
import React, {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  aspectRatio?: keyof ImageAspectRatioTokens
  height?: number
} & ViewProps

/**
 * Horizontally centers media content, e.g. an image or video.
 * Applies the aspect ratio and height to the content.
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
      <View style={styles.content}>{children}</View>
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
      content: {
        maxWidth: '100%',
        minHeight: height,
        aspectRatio: media.aspectRatio[aspectRatio],
      },
    })
