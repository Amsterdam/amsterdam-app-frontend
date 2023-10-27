import {PressableProps, StyleSheet} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Icon} from '@/components/ui/media/Icon'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const AddButton = (props: PressableProps) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
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
