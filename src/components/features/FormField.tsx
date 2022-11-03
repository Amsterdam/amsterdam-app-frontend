import React from 'react'
import {Controller, UseControllerProps} from 'react-hook-form'
import {CharactersLeftDisplay, TextInput} from '@/components/ui/forms'
import {Column} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'

type Props = {
  label: string
  maxCharacters: number
  numberOfLines?: number
  placeholder: string
} & UseControllerProps

export const FormField = ({
  defaultValue = '',
  label,
  maxCharacters,
  numberOfLines,
  name,
  placeholder,
  rules,
}: Props) => (
  <Controller
    rules={rules}
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
            value={value as string}
            warning={!!error}
          />
        </Column>
        <CharactersLeftDisplay
          maxCharacters={maxCharacters}
          numOfCharacters={(value as string).length}
        />
        {!!error && <Paragraph color="warning">{error.message}</Paragraph>}
      </>
    )}
    name={name}
    defaultValue={defaultValue as string}
  />
)
