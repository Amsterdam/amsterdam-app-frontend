import {title} from 'process'
import {StyleSheet} from 'react-native'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {cityPass} from '@/modules/city-pass/mocks/cityPass'
import {PassOwnerOld} from '@/modules/city-pass/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  passOwner: PassOwnerOld
} & Omit<PressableProps, 'children' | 'variant'>

export const CityPassCard = ({
  onPress,
  passOwner,
  testID,
  accessibilityRole = 'button',
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles)
  const activePass = passOwner.passen.find(({actief}) => actief === true)
  const {voornaam} = passOwner
  const budgets = cityPass.find(pass => pass.id === activePass?.id)?.budgetten
  const budgetsBalance = budgets?.reduce(
    (acc, budget) => acc + budget.budget_balance,
    0,
  )
  const budgetsBalanceSentence = budgetsBalance
    ? `Totaal saldo ${formatNumber(budgetsBalance, true)}`
    : ''

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
            text={voornaam}
          />
          {!!budgetsBalance && (
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
