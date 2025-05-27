import {useCallback, useState} from 'react'
import {StyleSheet} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {config} from '@/components/ui/config'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {useCopyToClipboard} from '@/hooks/useCopyToClipboard'
import {LogProps} from '@/processes/piwik/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  label: string
  'logging-label'?: string
  textToCopy: string
} & LogProps &
  TestProps

export const CopyButton = ({
  label,
  textToCopy,
  testID,
  ...pressableProps
}: Props) => {
  const {isCopied, copyToClipboard} = useCopyToClipboard(textToCopy)
  const [isPressed, setIsPressed] = useState(false)
  const styles = useThemable(createStyles(isPressed))

  const mergeOnPressIn = useCallback(() => {
    setIsPressed(true)
  }, [])

  const mergeOnPressOut = useCallback(() => {
    setIsPressed(false)
  }, [])

  return (
    <PressableBase
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      onPress={copyToClipboard}
      onPressIn={mergeOnPressIn}
      onPressOut={mergeOnPressOut}
      style={styles.button}
      testID={testID}
      {...pressableProps}>
      <Row gutter="sm">
        <Icon
          color={isCopied ? 'confirm' : 'link'}
          name="copy"
          size="md"
          testID={`${testID}Icon`}
        />
        <Phrase
          color={isCopied ? 'confirm' : 'link'}
          emphasis="strong"
          testID={`${testID}Label`}>
          {isCopied ? 'Gekopieerd' : label}
        </Phrase>
      </Row>
    </PressableBase>
  )
}

const getBackgroundColor = (color: Theme['color'], isPressed: boolean) =>
  color.pressable.tertiary[isPressed ? 'pressed' : 'default'].background

const createStyles =
  (isPressed: boolean) =>
  ({border, color, text, size}: Theme) => {
    const buttonHeight = config.buttonHeight
    const labelLineHeight = text.lineHeight.body

    const paddingHorizontal = size.spacing.md + 2 + border.width.md

    const paddingVertical = (buttonHeight - labelLineHeight) / 2

    return StyleSheet.create({
      button: {
        flexDirection: 'row',
        flexShrink: 1,
        paddingHorizontal,
        paddingVertical,
        backgroundColor: getBackgroundColor(color, isPressed),
      },
    })
  }
