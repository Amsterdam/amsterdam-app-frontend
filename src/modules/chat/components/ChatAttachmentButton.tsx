import {StyleSheet, View} from 'react-native'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {TestProps} from '@/components/ui/types'
import type {Ref} from 'react'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  iconName: SvgIconName
  label: string
  onPress: () => void
  ref?: Ref<View>
} & TestProps

export const ChatAttachmentButton = ({
  ref,
  onPress,
  iconName,
  testID,
  label,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <PressableBase
      onPress={onPress}
      ref={ref}
      testID={testID}>
      <Column
        gutter="xs"
        halign="center">
        <View style={styles.circle}>
          <Icon
            color="link"
            name={iconName}
            size="xl"
            testID={`${testID}Icon`}
          />
        </View>
        <Phrase testID={`${testID}Phrase`}>{label}</Phrase>
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
