import {forwardRef} from 'react'
import {Controller, UseControllerProps} from 'react-hook-form'
import {TextInputProps, TextInput as TextInputRN} from 'react-native'
import {CharactersLeftDisplay} from '@/components/ui/forms/CharactersLeftDisplay'
import {TextInput, TextInputSharedProps} from '@/components/ui/forms/TextInput'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {type TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props = {
  maxCharacters?: number
} & TextInputSharedProps &
  TestProps &
  UseControllerProps &
  Pick<
    TextInputProps,
    | 'autoFocus'
    | 'autoCapitalize'
    | 'autoComplete'
    | 'autoCorrect'
    | 'keyboardType'
    | 'enterKeyHint'
    | 'onSubmitEditing'
    | 'submitBehavior'
    | 'returnKeyType'
    | 'maxLength'
  >

export const TextInputField = forwardRef<TextInputRN, Props>(
  (
    {
      autoFocus,
      defaultValue = '',
      inputInstructions,
      label,
      maxCharacters,
      numberOfLines,
      name,
      placeholder,
      rules,
      testID,
      textTransform,
      ...textInputProps
    }: Props,
    ref,
  ) => {
    const accessibilityAnnounce = useAccessibilityAnnounce()

    return (
      <Controller
        defaultValue={defaultValue as string}
        name={name}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          error?.message && accessibilityAnnounce(error.message)

          return (
            <Column gutter="sm">
              <Column gutter="xs">
                <TextInput
                  accessibilityHint={inputInstructions}
                  accessibilityLabel={label}
                  accessibilityLanguage="nl-NL"
                  autoFocus={autoFocus}
                  inputInstructions={inputInstructions}
                  label={label}
                  multiline={!!numberOfLines}
                  numberOfLines={numberOfLines}
                  onChangeText={onChange}
                  placeholder={placeholder}
                  ref={ref}
                  testID={`${testID}Input`}
                  textTransform={textTransform}
                  value={value as string}
                  warning={!!error}
                  {...textInputProps}
                />
              </Column>
              {!!maxCharacters && (
                <CharactersLeftDisplay
                  maxCharacters={maxCharacters}
                  numOfCharacters={(value as string).length}
                />
              )}
              {!!error && (
                <Paragraph
                  color="warning"
                  testID={`${testID}ErrorText`}>
                  {error.message}
                </Paragraph>
              )}
            </Column>
          )
        }}
        rules={rules}
      />
    )
  },
)
