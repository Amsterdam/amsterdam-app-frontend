import {useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {View} from 'react-native'
import ImageFallbackSvg from '@/assets/images/image-fallback.svg'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = {
  aspectRatio?: ImageAspectRatio
}

export const ImageFallback = ({aspectRatio = 'wide'}: Props) => {
  const createdStyles = useMemo(() => createStyles(aspectRatio), [aspectRatio])
  const styles = useThemable(createdStyles)

  return (
    <View
      accessibilityLabel="Afbeelding niet gevonden"
      accessibilityLanguage="nl-NL"
      style={styles.fallback}>
      <ImageFallbackSvg />
    </View>
  )
}

const createStyles =
  (aspectRatio: ImageAspectRatio) =>
  ({color, media}: Theme) =>
    StyleSheet.create({
      fallback: {
        alignItems: 'center',
        aspectRatio: media.aspectRatio[aspectRatio],
        backgroundColor: color.background.cutout,
        borderWidth: 1,
        borderColor: color.border.primary,
        flex: 1,
        justifyContent: 'center',
      },
    })
