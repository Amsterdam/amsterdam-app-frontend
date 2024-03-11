import {useCallback, useMemo, useState} from 'react'
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import {StyleSheet} from 'react-native'
import {ImageErrorEventData} from 'react-native'
import {NativeSyntheticEvent} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Image, ImageProps} from '@/components/ui/media/Image'
import {ImageFallback} from '@/components/ui/media/ImageFallback'
import {TestProps} from '@/components/ui/types'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = Omit<ImageProps, 'style'> & {
  imageStyle?: StyleProp<ImageStyle>
  showFallbackOnMissingSource?: boolean
  style?: StyleProp<ViewStyle>
} & TestProps

const hasImageSource = (source?: ImageSourcePropType) => {
  if (!source) {
    return false
  }

  return !(Array.isArray(source) && source.length === 0)
}

export const LazyImage = ({
  aspectRatio = 'wide',
  imageStyle,
  onError,
  onLoadEnd,
  style,
  showFallbackOnMissingSource = false,
  testID,
  source,
  ...rest
}: Props) => {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSkeleton, setShowSkeleton] = useState(true)

  const {fader, image, positionedView, wrapperView} = useThemable(
    useMemo(() => createStyles(aspectRatio), [aspectRatio]),
  )

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
    if (showFallbackOnMissingSource) {
      return <ProjectWarningFallbackImage />
    }

    return null
  }

  return (
    <View
      style={[wrapperView, style]}
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
        aspectRatio: media.aspectRatio[aspectRatio],
        position: 'relative',
      },
    })
