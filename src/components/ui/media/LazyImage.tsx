/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react'
import {View} from 'react-native'
import {StyleSheet} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
import {Image, ImageProps} from '@/components/ui/media/Image'
import {ImageFallback} from '@/components/ui/media/ImageFallback'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = ImageProps

const TempLoader = () => (
  <View
    style={{
      backgroundColor: '#aaa',
      flex: 1,
    }}
  />
)

export const LazyImage = (props: Props) => {
  const [status, setStatus] = useState(0)
  const {aspectRatio = 'wide', onError, onLoadEnd} = props
  const styles = useThemable(createStyles(aspectRatio))

  return (
    <View style={[styles.view, {flex: 1, position: 'relative'}]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}>
        <TempLoader />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}>
        <Fader shouldAnimate={status === 1}>
          <Image
            {...props}
            onError={e => {
              setStatus(-1)
              onError?.(e)
            }}
            onLoadEnd={() => {
              setStatus(1)
              onLoadEnd?.()
            }}
            style={{flex: 1}}
          />
        </Fader>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}>
        <Fader shouldAnimate={status === -1}>
          <ImageFallback />
        </Fader>
      </View>
    </View>
  )
}

const createStyles =
  (aspectRatio: ImageAspectRatio) =>
  ({media}: Theme) =>
    StyleSheet.create({
      view: {
        aspectRatio: media.aspectRatio[aspectRatio],
      },
    })
