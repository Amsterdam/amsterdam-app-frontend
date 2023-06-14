import {StyleSheet, View} from 'react-native'
import {Image as ImageType} from 'react-native-image-crop-picker'
import {IconButton} from '@/components/ui/buttons'
import {Icon, Image} from '@/components/ui/media'
import {IconSize} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'

type Props = {
  image: ImageType
  onPress: () => void
}

const iconSize = 'lg'

export const ImagePreview = ({image, onPress}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View>
      <Image source={{uri: image.path}} />
      <View style={styles.buttonContainer}>
        <IconButton
          accessibilityHint="Verwijder foto"
          icon={
            <Icon
              color="link"
              name="trash-bin"
              size={iconSize}
            />
          }
          onPress={onPress}
        />
      </View>
    </View>
  )
}

const createStyles = ({color, size}: Theme) => {
  const buttonContainerPadding = size.spacing.sm

  return StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: size.spacing.sm,
      right: size.spacing.sm,
      backgroundColor: color.background.cutout,
      borderRadius: (IconSize[iconSize] + buttonContainerPadding * 2) / 2,
      padding: buttonContainerPadding,
    },
  })
}
