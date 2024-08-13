import {title} from 'process'
import {StyleSheet} from 'react-native'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {CityPass} from '@/modules/city-pass/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  cityPass: CityPass
} & Omit<PressableProps, 'children' | 'variant'>

export const CityPassCard = ({
  onPress,
  cityPass: {
    budgets,
    balanceFormatted,
    owner: {firstname},
  },
  testID,
  accessibilityRole = 'button',
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles)
  const budgetsBalanceSentence = `Totaal saldo ${balanceFormatted}`

  return (
    <Pressable
      accessibilityLabel={accessibleText(title, budgetsBalanceSentence)}
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
            name="city-pass"
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
            text="Stadspas details"
          />
          <Title
            color="link"
            level="h3"
            testID={`${testID}Name`}
            text={firstname}
          />
          {!!budgets.length && (
            <Paragraph
              testID={`${testID}Text`}
              variant="small">
              {budgetsBalanceSentence}
            </Paragraph>
          )}
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
