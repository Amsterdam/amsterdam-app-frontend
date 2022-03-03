import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, font} from '../../tokens'
import {Text, Title} from './index'

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
    <View style={styles.stepper}>
      {steps.map(step => (
        <View
          key={`step-${step.label}`}
          style={[styles.step, step.isLast && styles.stepLast]}>
          <View
            style={[
              styles.circle,
              step.isComplete && styles.circleComplete,
              step.isCurrent && styles.circleCurrent,
            ]}>
            {step.isCurrent ? (
              <Title level={3} inverse text={step.label} />
            ) : (
              <Text inverse>{step.label}</Text>
            )}
          </View>
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
    </View>
  )
}

const circleSize = font.height.p1
const currentCircleSize = 30

const styles = StyleSheet.create({
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: circleSize,
    height: circleSize,
    backgroundColor: color.background.inactive,
    borderRadius: 10,
    paddingLeft: 1, // Imrpove centering
  },
  circleComplete: {
    backgroundColor: color.background.emphasis,
  },
  circleCurrent: {
    width: currentCircleSize,
    height: currentCircleSize,
    borderRadius: currentCircleSize / 2,
    paddingLeft: 0,
  },
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
  },
  stepLast: {
    flexGrow: 0,
  },
  stepper: {
    flexDirection: 'row',
  },
})
