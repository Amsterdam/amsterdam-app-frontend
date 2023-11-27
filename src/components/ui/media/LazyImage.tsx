import {useCallback, useState} from 'react'
import {View} from 'react-native'
import {StyleSheet} from 'react-native'
import {ImageErrorEventData} from 'react-native'
import {NativeSyntheticEvent} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Image, ImageProps} from '@/components/ui/media/Image'
import {ImageFallback} from '@/components/ui/media/ImageFallback'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = ImageProps

export const LazyImage = (props: Props) => {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSkeleton, setShowSkeleton] = useState(true)

  const {aspectRatio = 'wide', onError, onLoadEnd, style} = props
  const styles = useThemable(createStyles(aspectRatio))

  const handleError = useCallback(
    (e?: NativeSyntheticEvent<ImageErrorEventData>) => {
      setFailed(true)
      onError?.(e)
    },
    [onError],
  )

  const handleLoadEnd = useCallback(() => {
    setLoading(false)
    onLoadEnd?.()
  }, [onLoadEnd])

  const callback = useCallback(() => setShowSkeleton(false), [])

  return (
    <View style={styles.wrapperView}>
      {!!showSkeleton && (
        <View style={styles.positionedView}>
          <Skeleton />
        </View>
      )}
      <View style={styles.positionedView}>
        <Fader
          callback={callback}
          duration={500}
          shouldAnimate={!loading || failed}
          style={styles.fader}>
          {failed ? (
            <ImageFallback />
          ) : (
            <Image
              {...props}
              onError={handleError}
              onLoadEnd={handleLoadEnd}
              style={[style, styles.image]}
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
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      wrapperView: {
        aspectRatio: media.aspectRatio[aspectRatio],
        flex: 1,
        position: 'relative',
      },
    })
