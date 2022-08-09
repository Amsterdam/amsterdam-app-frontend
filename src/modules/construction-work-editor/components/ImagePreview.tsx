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
  const {color, size} = useTheme()
  const buttonContainerPadding = size.spacing.xs
  const styles = useThemable(createStyles(buttonContainerPadding))

  return (
    <View>
      <Image source={{uri: image.path}} />
      <View style={styles.buttonContainer}>
        <IconButton
          accessibilityHint="Verwijder foto"
          hitSlop={size.spacing.xs}
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

const createStyles =
  (buttonContainerPadding: number) =>
  ({color, size}: Theme) => {
    return StyleSheet.create({
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      buttonContainer: {
        position: 'absolute',
        bottom: size.spacing.xs,
        right: size.spacing.xs,
        backgroundColor: color.background.cutout,
        borderRadius: (iconSize + buttonContainerPadding * 2) / 2,
        padding: buttonContainerPadding,
      },
    })
  }
