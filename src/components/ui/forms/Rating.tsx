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
  max?: number
  onChange: (position: number) => void
  rating: number | null
  ratingLabels?: Array<string>
} & TestProps

export const Rating = ({
  max = 5,
  label,
  ratingLabels,
  rating,
  errorMessage,
  testID,
  onChange,
}: RatingProps) => (
  <Column gutter="md">
    {!!label && <Label text={label} />}
    <Row>
      {Array.from({length: max}, (_, i) => i + 1).map(position => (
        <RateStar
          accessibilityLabel={`Geef een score van ${position} uit ${max}.`}
          isSelected={!!rating && position <= rating}
          key={`ranking_${position}`}
          onPress={() => onChange(position)}
          testID={testID}
        />
      ))}
    </Row>
    {!!rating && !!ratingLabels?.[rating - 1] && (
      <Phrase testID={`${testID}RatingLabel${rating}Phrase`}>
        {ratingLabels[rating - 1]}
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
