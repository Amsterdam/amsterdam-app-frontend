import {StyleSheet} from 'react-native'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  text?: string
  title: string
} & Omit<PressableProps, 'children' | 'variant'>

export const CityPassCard = ({
  onPress,
  text,
  title,
  testID,
  accessibilityRole = 'button',
  ...pressableProps
}: Props) => {
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
      insetVertical="sm"
      style={styles.card}>
      <Row gutter="md">
        <Box insetTop="sm">
          <Icon
            color="link"
            name="arrowTopRight"
            size="xl"
            testID={`${testID}Icon`}
          />
        </Box>
        <Column
          align="center"
          grow={1}
          gutter="xs"
          shrink={1}>
          <Title
            color="link"
            level="h3"
            testID={`${testID}Title`}
            text={title}
          />
          <Paragraph
            testID={`${testID}Text`}
            variant="small">
            {text}
          </Paragraph>
        </Column>
        <Row valign="center">
          <Icon
            color="link"
            name="chevron-right"
            size="lg"
            testID={`${testID}Icon`}
          />
        </Row>
      </Row>
    </Pressable>
  )
}

const createStyles = ({color, border}: Theme) =>
  StyleSheet.create({
    card: {
      borderColor: color.border.onGrey,
      borderWidth: border.width.sm,
      borderStyle: 'solid',
    },
  })
