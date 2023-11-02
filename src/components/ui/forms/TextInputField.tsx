import {Controller, UseControllerProps} from 'react-hook-form'
import {TextInputProps} from 'react-native'
import {CharactersLeftDisplay} from '@/components/ui/forms/CharactersLeftDisplay'
import {TextInput} from '@/components/ui/forms/TextInput'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props = {
  label: string
  maxCharacters?: number
  numberOfLines?: number
  placeholder: string
} & Required<TestProps> &
  UseControllerProps &
  Pick<TextInputProps, 'autoFocus'>

export const TextInputField = ({
  autoFocus,
  defaultValue = '',
  label,
  maxCharacters,
  numberOfLines,
  name,
  placeholder,
  rules,
  testID,
}: Props) => {
  const accessibilityAnnounce = useAccessibilityAnnounce({queue: true})

  return (
    <Controller
      defaultValue={defaultValue as string}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        error?.message && accessibilityAnnounce(error.message)

        return (
          <>
            <Column gutter="xs">
              <TextInput
                accessibilityLabel={label}
                accessibilityLanguage="nl-NL"
                autoFocus={autoFocus}
                label={label}
                multiline={!!numberOfLines}
                numberOfLines={numberOfLines ?? 1}
                onChangeText={onChange}
                placeholder={placeholder}
                testID={`${testID}Input`}
                value={value as string}
                warning={!!error}
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
          </>
        )
      }}
      rules={rules}
    />
  )
}
