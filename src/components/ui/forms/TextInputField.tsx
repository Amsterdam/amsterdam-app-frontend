import {Controller, UseControllerProps} from 'react-hook-form'
import {CharactersLeftDisplay, TextInput} from '@/components/ui/forms'
import {Column} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {TestProps} from '@/components/ui/types'

type Props = {
  label: string
  maxCharacters: number
  numberOfLines?: number
  placeholder: string
} & Required<TestProps> &
  UseControllerProps

export const TextInputField = ({
  defaultValue = '',
  label,
  maxCharacters,
  numberOfLines,
  name,
  placeholder,
  rules,
  testID,
}: Props) => (
  <Controller
    defaultValue={defaultValue as string}
    name={name}
    render={({field: {onChange, value}, fieldState: {error}}) => (
      <>
        <Column gutter="xs">
          <TextInput
            accessibilityLabel={label}
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
        <CharactersLeftDisplay
          maxCharacters={maxCharacters}
          numOfCharacters={(value as string).length}
        />
        {!!error && (
          <Paragraph
            color="warning"
            testID={`${testID}ErrorText`}>
            {error.message}
          </Paragraph>
        )}
      </>
    )}
    rules={rules}
  />
)
