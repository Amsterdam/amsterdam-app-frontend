import {Text, StyleSheet} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {IconSize} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  iconName?: SvgIconName
  iconSize?: keyof typeof IconSize
  keyNumber?: number
  onPress: () => void
}

export const AccessCodeKeyBoardKey = ({
  iconName,
  iconSize,
  keyNumber,
  onPress,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, iconName && styles.transparent]}
      testID={`AccessCodeKeyBoardKey${keyNumber ?? iconName}`}>
      {!!iconName && (
        <Icon
          name={iconName}
          size={iconSize}
          testID="AccessCodeKeyBoardKeyIcon"
        />
      )}
      {typeof keyNumber === 'number' && (
        <Text
          style={styles.text}
          testID="AccessCodeKeyBoardKeyText">
          {keyNumber}
        </Text>
      )}
    </Pressable>
  )
}

const WIDTH = 115
const HEIGHT = 44

const createStyles = ({color, text}: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: color.customKeyboard.button,
      justifyContent: 'center',
      width: WIDTH,
      height: HEIGHT,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
    text: {
      fontSize: text.fontSize.h2,
    },
  })
