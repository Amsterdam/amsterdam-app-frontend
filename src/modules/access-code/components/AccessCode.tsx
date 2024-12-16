import {View, StyleSheet} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  accessCode: number[]
  codeLength: number
  error?: string
}

export const AccessCode = ({accessCode, codeLength, error}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Column gutter="sm">
      <Row
        align="center"
        gutter="md">
        {Array.from({length: codeLength}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.item,
              index === accessCode.length ? styles.active : undefined,
            ]}>
            {accessCode[index] !== undefined ? ( // Just `accessCode[index]` excludes 0 value
              <Icon
                name="asterisk"
                testID="AccessCodeDigitAsterisk"
              />
            ) : null}
          </View>
        ))}
      </Row>
      {!!error && <Paragraph color="warning">{error}</Paragraph>}
    </Column>
  )
}

const createStyles = ({border, color}: Theme) =>
  StyleSheet.create({
    active: {
      borderWidth: border.width.md,
    },
    item: {
      backgroundColor: color.accessToken.digit.background,
      borderWidth: border.width.sm,
      borderColor: color.accessToken.digit.border,
      height: 52,
      width: 52,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
