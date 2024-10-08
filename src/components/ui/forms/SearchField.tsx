import {forwardRef, useState} from 'react'
import {
  type GestureResponderEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  type TextInputFocusEventData,
  type TextInputKeyPressEventData,
  type TextInputProps,
  View,
} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useSearchField} from '@/hooks/useSearchField'
import {usePiwikTrackSearchFromProps} from '@/processes/piwik/hooks/usePiwikTrackSearchFromProps'
import {PiwikDimension} from '@/processes/piwik/types'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
} & TestProps &
  TextInputProps

export const SearchField = forwardRef<TextInput, Props>(
  (
    {
      onChangeText,
      onFocus,
      testID,
      value = '',
      accessibilityLanguage = 'nl-NL',
      ...textInputProps
    }: Props,
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false)
    const styles = useThemable(createStyles({hasFocus}))
    const themedTextInputProps = useThemable(createTextInputProps)
    const {
      type: searchType,
      amount: searchResultAmount,
      setSearchFieldValue,
    } = useSearchField()

    const onEvent = usePiwikTrackSearchFromProps({
      keyword: value,
      options: {
        customDimensions: {
          [PiwikDimension.searchTerm]: value,
          [PiwikDimension.searchType]: searchType,
          [PiwikDimension.searchResultAmount]: searchResultAmount.toString(),
        },
        category: searchType,
        count: searchResultAmount,
      },
    })

    const handleBlur = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      setHasFocus(false)
      onEvent(event)
    }

    const handleChangeText = (text: string) => {
      setSearchFieldValue(text)
      onChangeText?.(text)
    }

    const handleClearText = (event: GestureResponderEvent) => {
      setSearchFieldValue('')
      onChangeText?.('')
      onEvent(event)
    }

    const handleFocus = () => {
      setHasFocus(true)
      onFocus?.()
    }

    const handleBackspaceKeyPress = (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (event.nativeEvent.key === 'Backspace') {
        onEvent(event)
      }
    }

    return (
      <View style={styles.frame}>
        <TextInput
          {...textInputProps}
          {...themedTextInputProps}
          accessibilityLanguage={accessibilityLanguage}
          multiline
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onKeyPress={handleBackspaceKeyPress}
          ref={ref}
          style={styles.textInput}
          testID={testID}
          textAlignVertical="top"
          value={value}
        />
        {value ? (
          <View>
            <IconButton
              accessibilityHint="Maak dit zoekveld leeg"
              accessibilityLanguage={accessibilityLanguage}
              icon={
                <Icon
                  name="close"
                  testID={`${testID}Icon`}
                />
              }
              onPress={handleClearText}
              testID={`${testID}ClearButton`}
            />
          </View>
        ) : (
          <IconButton
            accessibilityHint="Activeer dit zoekveld"
            accessibilityLanguage={accessibilityLanguage}
            icon={
              <Icon
                name="search"
                size="lg"
                testID={`${testID}Icon`}
              />
            }
            onPress={handleFocus}
            testID={`${testID}SubmitButton`}
          />
        )}
      </View>
    )
  },
)

type StylisticSearchFieldProps = {
  label: string
} & TestProps

export const StylisticSearchField = ({
  label,
  testID,
}: StylisticSearchFieldProps) => {
  const styles = useThemable(createStyles({}))

  return (
    <View style={styles.frame}>
      <View style={styles.textInput}>
        <Phrase
          color="secondary"
          testID={`${testID}Phrase`}>
          {label}
        </Phrase>
      </View>
      <Icon
        name="search"
        size="lg"
        testID={`${testID}Icon`}
      />
    </View>
  )
}

const borderWidth = (focus: boolean) => (focus ? 2 : 1)

const createStyles =
  ({hasFocus}: {hasFocus?: boolean} & Partial<Props>) =>
  ({color, size, text}: Theme) =>
    StyleSheet.create({
      frame: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: size.spacing.sm,
        paddingBottom:
          size.spacing.sm +
          (hasFocus ? borderWidth(false) - borderWidth(true) : 0),
        paddingHorizontal: size.spacing.md,
        backgroundColor: color.textInput.container.background,
        borderStyle: 'solid',
        borderBottomColor: hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderBottomWidth: borderWidth(!!hasFocus),
      },
      textInput: {
        flex: 1,
        padding: 0, // Override an Android default
        color: color.text.default,
        fontFamily: text.fontFamily.regular,
        fontSize: text.fontSize.body,
        lineHeight: text.lineHeight.body,
      },
    })

const createTextInputProps = ({color}: Theme): TextInputProps => ({
  placeholderTextColor: color.text.secondary,
})
