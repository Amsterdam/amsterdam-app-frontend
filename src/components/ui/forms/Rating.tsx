import type {PressableProps} from '@/components/ui/buttons/Pressable'
import type {TestProps} from '@/components/ui/types'
import type {GestureResponderEvent} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'

type RateStarProps = {
  isSelected: boolean
  onPress: (event: GestureResponderEvent) => void
} & Omit<PressableProps, 'children' | 'onPress'>

const RateStar = ({isSelected, testID, onPress, ...props}: RateStarProps) => (
  <IconButton
    accessibilityHint="Selecteer deze score"
    accessibilityLanguage="nl-NL"
    accessibilityRole="radio"
    accessibilityState={{selected: isSelected}}
    {...props}
    icon={
      <Icon
        color="link"
        name={isSelected ? 'starFilled' : 'star'}
        size="xll"
        testID={`${testID}Icon`}
      />
    }
    onPress={onPress}
    testID={`${testID}IconButton`}
  />
)

export type RatingProps = {
  errorMessage?: string
  label?: string
  onChange: (position: number) => void
  options?: {
    label: string
    value: string
  }[]
  rating: number | null
  required?: boolean
} & TestProps

export const Rating = ({
  label,
  options,
  rating,
  errorMessage,
  required,
  testID,
  onChange,
}: RatingProps) => (
  <Column gutter="md">
    {!!label && (
      <Label
        required={required}
        text={label}
      />
    )}
    <Row>
      {options?.map(({value}) => (
        <RateStar
          accessibilityLabel={`Geef een score van ${value} uit ${options.length}.`}
          isSelected={!!rating && Number(value) <= rating}
          key={`ranking_${value}`}
          onPress={() => onChange(Number(value))}
          testID={testID}
        />
      ))}
    </Row>
    {!!rating && !!options?.[rating - 1] && (
      <Phrase testID={`${testID}RatingLabel${rating}Phrase`}>
        {options[rating - 1].label}
      </Phrase>
    )}
    {!!errorMessage && (
      <ErrorMessage
        testID={`${testID}ErrorMessage`}
        text={errorMessage}
      />
    )}
  </Column>
)
