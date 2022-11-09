import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
  Image as ImageRN,
  ImageProps as ImageRNProps,
  ImageSourcePropType,
  ImageURISource,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ImageAspectRatioTokens} from '@/themes/tokens'

type ImageProps = {
  aspectRatio?: keyof ImageAspectRatioTokens
  customAspectRatio?: number
}

type Props = ImageProps & Omit<ImageRNProps, 'style'>

/**
 * Updates the image source to force using a cached version of the image.
 * If this is not present, it fetches the image normally.
 * iOS only.
 * @see https://reactnative.dev/docs/images#cache-control-ios-only
 */
const addCacheToImageSource = (
  source: ImageSourcePropType,
): ImageSourcePropType => {
  if (typeof source === 'number') {
    return source
  }

  if (Array.isArray(source)) {
    return source.map(s => addCacheToImageSource(s) as ImageURISource)
  }

  return {
    cache: 'force-cache',
    ...source,
  }
}

export const Image = ({
  aspectRatio = 'default',
  customAspectRatio,
  source,
  ...imageProps
}: Props) => {
  const {height: windowHeight, width: windowWidth} = useWindowDimensions()
  const [width, setWidth] = useState<number | undefined>(undefined)

  const createdStyles = useMemo(
    () => createStyles({aspectRatio, customAspectRatio}, width),
    [aspectRatio, customAspectRatio, width],
  )
  const styles = useThemable(createdStyles)

  useEffect(() => {
    // reset saved width on every window size change, so the image is allowed to grow bigger
    setWidth(undefined)
  }, [windowHeight, windowWidth])

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width)
    },
    [setWidth],
  )

  return (
    <ImageRN
      onLayout={onLayout}
      source={addCacheToImageSource(source)}
      style={[styles.image]}
      {...imageProps}
    />
  )
}

const createStyles =
  (
    {
      aspectRatio,
      customAspectRatio,
    }: ImageProps & Required<Pick<ImageProps, 'aspectRatio'>>,
    width: number | undefined,
  ) =>
  ({media}: Theme) => {
    const aspectRatioValue = customAspectRatio ?? media.aspectRatio[aspectRatio]

    return StyleSheet.create({
      image: {
        width: undefined,
        maxWidth: '100%',
        height:
          Platform.OS === 'android' && width && aspectRatioValue > 0
            ? width / aspectRatioValue
            : undefined,
        flex: 1,
        aspectRatio: aspectRatioValue,
        resizeMode: 'cover',
      },
    })
  }
