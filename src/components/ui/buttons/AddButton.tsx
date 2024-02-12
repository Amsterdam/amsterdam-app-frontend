import {StyleSheet} from 'react-native'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Icon} from '@/components/ui/media/Icon'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = Omit<PressableProps, 'children'>

export const AddButton = (props: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityLanguage="nl-NL"
      style={styles.button}
      {...props}>
      <Icon
        color="link"
        name="enlarge"
        size="lg"
      />
    </Pressable>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    button: {
      padding: size.spacing.md,
      alignItems: 'center',
      borderColor: color.border.primary,
      borderStyle: 'dashed',
      borderWidth: 1,
    },
  })
