import {useCallback, useEffect, useMemo, useState} from 'react'
import {
  Image as ImageRN,
  ImageProps as ImageRNProps,
  ImageURISource,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import FastImage, {ImageStyle as FastImageStyle} from 'react-native-fast-image'
import {getUriForWidth} from '@/components/ui/utils/image'
import {Theme} from '@/themes/themes'
import {ImageAspectRatioTokens} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

// Image props supported by both Image and FastImage
type ImageResizeMode = 'cover' | 'contain' | 'cover' | 'stretch'

type SupportedImageRNProps = Omit<
  ImageRNProps,
  'defaultSource' | 'onError' | 'onLoad' | 'resizeMode'
> & {
  resizeMode?: ImageResizeMode
}

type Props = {
  aspectRatio?: keyof ImageAspectRatioTokens
} & Omit<SupportedImageRNProps, 'style'>

type CachedIosImageProps = {
  uriSources?: ImageURISource | ImageURISource[]
  width?: number
} & Omit<SupportedImageRNProps, 'source'>

const CachedIosImage = ({
  onLayout,
  style,
  uriSources,
  width = 0,
  ...imageProps
}: CachedIosImageProps) => {
  const uri = useMemo(
    () => getUriForWidth(width, uriSources),
    [uriSources, width],
  )

  return (
    <FastImage
      accessibilityIgnoresInvertColors
      accessibilityLanguage="nl-NL"
      onLayout={onLayout}
      source={{uri}}
      style={style as StyleProp<FastImageStyle>}
      {...imageProps}
    />
  )
}

export const Image = ({
  aspectRatio = 'wide',
  onLayout,
  source,
  ...imageProps
}: Props) => {
  const {height: windowHeight, width: windowWidth} = useWindowDimensions()
  const [width, setWidth] = useState<number | undefined>(undefined)

  const createdStyles = useMemo(
    () => createStyles(aspectRatio, width),
    [aspectRatio, width],
  )
  const styles = useThemable(createdStyles)

  useEffect(() => {
    // reset saved width on every window size change, so the image is allowed to grow bigger
    setWidth(undefined)
  }, [windowHeight, windowWidth])

  const onLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width)
      onLayout?.(event)
    },
    [onLayout, setWidth],
  )

  // RN default image caching behaviour works well on Android, but not on iOS. So for iOS we use FastImage, which has improved cacheing.
  // The number type check filters out bundled images using require which do not need to be cached.
  if (Platform.OS === 'ios' && typeof source !== 'number') {
    return (
      <CachedIosImage
        onLayout={onLayoutChange}
        style={[styles.image]}
        uriSources={source}
        width={width}
        {...imageProps}
      />
    )
  }

  return (
    <ImageRN
      accessibilityIgnoresInvertColors
      accessibilityLanguage="nl-NL"
      onLayout={onLayoutChange}
      source={source}
      style={[styles.image]}
      {...imageProps}
    />
  )
}

const createStyles =
  (aspectRatio: keyof ImageAspectRatioTokens, width?: number) =>
  ({media}: Theme) => {
    const aspectRatioValue = media.aspectRatio[aspectRatio]

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
      },
    })
  }
