import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon, IconProps} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type TopTaskButtonProps = {
  border?: boolean
  iconName: SvgIconName
  iconRightName?: SvgIconName
  iconRightSize?: IconProps['size']
  iconSize?: IconProps['size']
  isError?: boolean
  text?: ReactNode
  title: string
  titleIconName?: SvgIconName
} & Omit<PressableProps, 'children' | 'style'>

export const TopTaskButton = ({
  isError = false,
  iconName,
  iconRightName,
  iconRightSize = 'xl',
  iconSize = 'xl',
  onPress,
  text,
  title,
  titleIconName,
  testID,
  accessibilityRole = 'button',
  ...pressableProps
}: TopTaskButtonProps) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityLabel={accessibleText(
        title,
        typeof text === 'string' ? text : '',
      )}
      accessibilityLanguage="nl-NL"
      accessibilityRole={accessibilityRole}
      onPress={onPress}
      testID={testID}
      {...pressableProps}
      insetHorizontal="md"
      insetVertical="sm">
      <Row gutter="md">
        <View style={styles.height}>
          <HideFromAccessibility>
            <Icon
              color="link"
              name={iconName}
              size={iconSize}
              testID={`${testID}Icon`}
            />
          </HideFromAccessibility>
        </View>
        <Column
          align="center"
          grow={1}
          shrink={1}>
          <Row gutter="sm">
            <Title
              color="link"
              level="h5"
              testID={`${testID}Title`}
              text={title}
            />
            {!!titleIconName && (
              <Icon
                color="link"
                name={titleIconName}
                testID={`${testID}TitleIcon`}
              />
            )}
          </Row>
          {typeof text === 'string' ? (
            <Paragraph
              color={isError ? 'warning' : undefined}
              testID={`${testID}Text`}
              variant="small">
              {text}
            </Paragraph>
          ) : (
            text
          )}
        </Column>
        {!!iconRightName && (
          <View style={styles.height}>
            <HideFromAccessibility>
              <Icon
                color="link"
                name={iconRightName}
                size={iconRightSize}
                testID={`${testID}Icon`}
              />
            </HideFromAccessibility>
          </View>
        )}
      </Row>
    </Pressable>
  )
}

const createStyles = ({text}: Theme) =>
  StyleSheet.create({
    height: {
      justifyContent: 'center',
      height: text.lineHeight.h5 + text.lineHeight.small,
    },
  })
