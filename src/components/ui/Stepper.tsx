import React from 'react'
import {StyleSheet, View} from 'react-native'
import {SingleSelectable, TextInCircle} from './index'
import {color, font} from '../../tokens'

type Props = {
  current?: number
  length: number
}

type Step = {
  description: string
  isComplete: boolean
  isCurrent: boolean
  isLast: boolean
  label: string
}

export const Stepper = ({current = 1, length}: Props) => {
  const steps: Step[] = Array.from(new Array(length), (item, index) => {
    const oneBasedIndex = index + 1

    return {
      description: `Stap ${oneBasedIndex} van ${length}`,
      isComplete: oneBasedIndex <= current,
      isCurrent: oneBasedIndex === current,
      isLast: oneBasedIndex === length,
      label: oneBasedIndex.toString(),
    }
  })

  return (
    <SingleSelectable
      accessibilityLabel=""
      accessibilityRole="progressbar"
      accessibilityValue={{text: steps[current - 1].description}}
      style={styles.stepper}>
      {steps.map(step => (
        <View
          key={`step-${step.label}`}
          style={[styles.step, step.isLast && styles.stepLast]}>
          <TextInCircle
            backgroundColor={
              step.isComplete
                ? color.background.emphasis
                : color.background.inactive
            }
            fontSize={step.isCurrent ? font.size.h3 : undefined}
            label={step.label}
          />
          {!step.isLast && (
            <View
              style={[
                styles.connector,
                step.isComplete && !step.isCurrent && styles.connectorComplete,
              ]}
            />
          )}
        </View>
      ))}
    </SingleSelectable>
  )
}

const styles = StyleSheet.create({
  connector: {
    height: 4,
    flexGrow: 1,
    alignSelf: 'center',
    backgroundColor: color.background.inactive,
  },
  connectorComplete: {
    backgroundColor: color.background.emphasis,
  },
  step: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  stepLast: {
    flexGrow: 0,
  },
  stepper: {
    flexDirection: 'row',
  },
})
