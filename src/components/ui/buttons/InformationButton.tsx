import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  iconName: SvgIconName
  text?: string
  title: string
  variant?: 'default' | 'inverse'
} & Omit<PressableProps, 'children' | 'variant'>

export const InformationButton = ({
  iconName,
  onPress,
  text,
  title,
  testID,
  accessibilityRole = 'button',
  variant,
  ...pressableProps
}: Props) => (
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
    insetVertical="sm"
    variant="transparent">
    <Row gutter="md">
      <Icon
        color={variant === 'inverse' ? 'inverse' : 'link'}
        name={iconName}
        size="xl"
        testID={`${testID}Icon`}
      />
      <Column
        align="center"
        grow={1}
        gutter="xs"
        shrink={1}>
        <Row valign="center">
          <Title
            color={variant === 'inverse' ? 'inverse' : 'link'}
            level="h4"
            testID={`${testID}Title`}
            text={title}
            underline
          />
        </Row>
        <Paragraph
          color={variant === 'inverse' ? 'inverse' : undefined}
          testID={`${testID}Text`}
          variant="small">
          {text}
        </Paragraph>
      </Column>
    </Row>
  </Pressable>
)
