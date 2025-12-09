import {View, type StyleProp, type ViewStyle} from 'react-native'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Pressable, type PressableProps} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type AddressSwitchBaseProps = {
  iconName: Extract<
    SvgIconName,
    'location' | 'housing' | 'spinner' | 'mapLocationIosFilled'
  >
  onPress?: PressableProps['onPress']
  title: string
} & TestProps

export const AddressSwitchBase = ({
  title,
  iconName,
  testID,
  onPress,
}: AddressSwitchBaseProps) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityHint="Navigeer naar het adres wijzigen scherm"
        accessibilityLabel={accessibleText(title)}
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        insetHorizontal="md"
        insetVertical="no"
        onPress={onPress}
        testID={testID}>
        <Row gutter="md">
          <View style={styles.height}>
            <HideFromAccessibility>
              <Icon
                color="link"
                name={iconName}
                size="lg"
                testID={`${testID}Icon`}
              />
            </HideFromAccessibility>
          </View>

          <Row
            align="between"
            grow={1}
            shrink={1}>
            <Paragraph
              color="link"
              testID={`${testID}Paragraph`}>
              {title}
            </Paragraph>

            <Icon
              color="link"
              name="chevron-right"
            />
          </Row>
        </Row>
      </Pressable>
    </View>
  )
}

const createStyles = (theme: Theme): Record<string, StyleProp<ViewStyle>> => ({
  container: {
    borderColor: theme.color.addressSwitch.border,
    borderWidth: theme.border.width.md,
  },
  height: {
    justifyContent: 'center',
    height: theme.text.lineHeight.h5 + theme.text.lineHeight.small,
  },
})
