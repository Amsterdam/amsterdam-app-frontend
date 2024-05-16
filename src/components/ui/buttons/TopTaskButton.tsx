import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type TopTaskButtonProps = {
  iconName: SvgIconName
  isError?: boolean
  text?: ReactNode
  title: string
  titleIconName?: SvgIconName
} & Omit<PressableProps, 'children'>

export const TopTaskButton = ({
  isError = false,
  iconName,
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
      grow
      onPress={onPress}
      testID={testID}
      {...pressableProps}
      insetHorizontal="md"
      insetVertical="sm">
      <Row gutter="md">
        <View style={styles.height}>
          <Icon
            color="link"
            name={iconName}
            size="xl"
            testID={`${testID}Icon`}
          />
        </View>
        <Column
          align="center"
          grow>
          <Row
            gutter="sm"
            valign="center">
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
