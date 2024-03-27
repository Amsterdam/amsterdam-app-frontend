import {useCallback, useMemo, useState, ReactElement} from 'react'
import {
  type ImageErrorEventData,
  type ImageSourcePropType,
  type ImageStyle,
  type NativeSyntheticEvent,
  type StyleProp,
  StyleSheet,
  View,
} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Image, type ImageProps} from '@/components/ui/media/Image'
import {ImageFallback} from '@/components/ui/media/ImageFallback'
import {type TestProps} from '@/components/ui/types'
import {type Theme} from '@/themes/themes'
import {type ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = Omit<ImageProps, 'style'> & {
  fallbackInheritsAspectRatio?: boolean
  imageStyle?: StyleProp<ImageStyle>
  /**
   * If the source is undefined, show the missingSourceFallback when it exists
   */
  missingSourceFallback?: ReactElement
} & TestProps

const hasImageSource = (source?: ImageSourcePropType) => {
  if (!source) {
    return false
  }

  return !(Array.isArray(source) && source.length === 0)
}

export const LazyImage = ({
  aspectRatio = 'wide',
  fallbackInheritsAspectRatio = true,
  imageStyle,
  onError,
  onLoadEnd,
  missingSourceFallback,
  testID,
  source,
  ...rest
}: Props) => {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSkeleton, setShowSkeleton] = useState(true)

  const {fader, image, positionedView, wrapperView, wrapperAspectRatio} =
    useThemable(useMemo(() => createStyles(aspectRatio), [aspectRatio]))

  const handleError = useCallback(
    (error?: NativeSyntheticEvent<ImageErrorEventData>) => {
      setFailed(true)
      onError?.(error)
    },
    [onError],
  )

  const handleLoadEnd = useCallback(() => {
    setLoading(false)
    onLoadEnd?.()
  }, [onLoadEnd])

  const callback = useCallback(() => setShowSkeleton(false), [])

  if (!hasImageSource(source)) {
    if (missingSourceFallback) {
      return (
        <View
          style={fallbackInheritsAspectRatio ? wrapperAspectRatio : undefined}
          testID={testID}>
          {missingSourceFallback}
        </View>
      )
    }

    return null
  }

  return (
    <View
      style={[wrapperView, wrapperAspectRatio]}
      testID={testID}>
      {!!showSkeleton && (
        <View style={positionedView}>
          <Skeleton />
        </View>
      )}
      <View style={positionedView}>
        <Fader
          callback={callback}
          duration={500}
          shouldAnimate={!loading || failed}
          style={fader}>
          {failed ? (
            <ImageFallback aspectRatio={aspectRatio} />
          ) : (
            <Image
              {...rest}
              aspectRatio={aspectRatio}
              onError={handleError}
              onLoadEnd={handleLoadEnd}
              source={source}
              style={[image, imageStyle]}
            />
          )}
        </Fader>
      </View>
    </View>
  )
}

const createStyles =
  (aspectRatio: ImageAspectRatio) =>
  ({media}: Theme) =>
    StyleSheet.create({
      wrapperAspectRatio: {
        aspectRatio: media.aspectRatio[aspectRatio],
      },
      fader: {
        flex: 1,
      },
      image: {
        flex: 1,
      },
      positionedView: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      wrapperView: {
        position: 'relative',
      },
    })
