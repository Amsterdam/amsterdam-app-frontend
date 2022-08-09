import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Image as ImageType} from 'react-native-image-crop-picker'
import {IconButton} from '@/components/ui/buttons'
import {Icon, Image} from '@/components/ui/media'
import {Theme, useThemable, useTheme} from '@/themes'

type Props = {
  image: ImageType
  onPress: () => void
}

const iconSize = 24

export const ImagePreview = ({image, onPress}: Props) => {
  const {color} = useTheme()
  const styles = useThemable(createStyles)

  return (
    <View>
      <Image source={{uri: image.path}} />
      <View style={styles.buttonContainer}>
        <IconButton
          accessibilityHint="Verwijder foto"
          onPress={onPress}
          icon={
            <Icon size={iconSize}>
              <TrashBin fill={color.text.link} />
            </Icon>
          }
        />
      </View>
    </View>
  )
}

const createStyles = ({color, size}: Theme) => {
  const buttonContainerPadding = size.spacing.xs
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
      borderRadius: (iconSize + buttonContainerPadding * 2) / 2,
      padding: buttonContainerPadding,
    },
  })
}
