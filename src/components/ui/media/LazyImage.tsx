/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react'
import {View} from 'react-native'
import {StyleSheet} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {Fader} from '@/components/ui/animations/Fader'
import {Image, ImageProps} from '@/components/ui/media/Image'
import {ImageFallback} from '@/components/ui/media/ImageFallback'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = ImageProps

const TempLoader = () => {
  const background = useThemable(({color}) => color.background.skeleton)

  // TODO: a11y anim
  return (
    <SkeletonPlaceholder
      backgroundColor={background}
      highlightColor="rgba(255,255,255,0.3)"
      speed={1000}>
      <SkeletonPlaceholder.Item
        alignItems="stretch"
        height={'100%'}
        justifyContent="space-between">
        <SkeletonPlaceholder.Item
          height={'100%'}
          width={'100%'}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export const LazyImage = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const {aspectRatio = 'wide', onError, onLoadEnd, onLoadStart, style} = props
  const styles = useThemable(createStyles(aspectRatio))

  return (
    <View style={styles.wrapperView}>
      <View style={styles.positionedView}>
        <TempLoader />
      </View>
      <View style={styles.positionedView}>
        <Fader shouldAnimate={!loading || failed}>
          {failed ? (
            <ImageFallback />
          ) : (
            <Image
              {...props}
              onError={e => {
                setFailed(true)
                onError?.(e)
              }}
              onLoadEnd={() => {
                setLoading(false)
                onLoadEnd?.()
              }}
              onLoadStart={() => {
                setLoading(true)
                onLoadStart?.()
              }}
              style={[style, {flex: 1}]}
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
      wrapperView: {
        aspectRatio: media.aspectRatio[aspectRatio],
        flex: 1,
        position: 'relative',
      },
      positionedView: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    })
