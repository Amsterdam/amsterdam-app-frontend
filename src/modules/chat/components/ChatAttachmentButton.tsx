import {StyleSheet, View} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  iconName: SvgIconName
  label: string
  onPress: () => void
} & TestProps

export const ChatAttachmentButton = ({
  onPress,
  iconName,
  testID,
  label,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <PressableBase
      onPress={onPress}
      testID={testID}>
      <Column
        gutter="xs"
        halign="center">
        <View style={styles.circle}>
          <Icon
            color="link"
            name={iconName}
            size="xl"
            testID={testID + 'Icon'}
          />
        </View>
        <Phrase testID={testID + 'Phrase'}>{label}</Phrase>
      </Column>
    </PressableBase>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    circle: {
      backgroundColor: color.chat.attachmentButtonCircle.background,
      borderRadius: 50,
      padding: size.spacing.md,
    },
  })
