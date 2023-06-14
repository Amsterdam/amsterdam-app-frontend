import {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ImageAspectRatioTokens} from '@/themes/tokens'

export type FigureProps = {
  aspectRatio?: keyof ImageAspectRatioTokens
  height?: number
} & Omit<ViewProps, 'style'>

/**
 * Horizontally centers media content, e.g. an image or video.
 * Applies the aspect ratio and height to the content.
 */
export const Figure = ({
  aspectRatio = 'wide',
  height,
  children,
  ...viewProps
}: FigureProps) => {
  const createdStyles = useMemo(
    () => createStyles({aspectRatio, height}),
    [aspectRatio, height],
  )
  const styles = useThemable(createdStyles)

  return (
    <View
      {...viewProps}
      style={styles.figure}>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const createStyles =
  ({
    aspectRatio,
    height,
  }: Required<Pick<FigureProps, 'aspectRatio'>> &
    Pick<FigureProps, 'height'>) =>
  ({media}: Theme) =>
    StyleSheet.create({
      figure: {
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      content: {
        maxWidth: '100%',
        minHeight: height,
        aspectRatio: media.aspectRatio[aspectRatio],
      },
    })
