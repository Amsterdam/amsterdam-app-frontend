import {Center} from '_components/ui/layout'
import React from 'react'
import {StyleSheet} from 'react-native'
import {Path, Svg} from 'react-native-svg'
import {useTheme} from '@/themes'

export type Direction = 'up' | 'down' | 'back' | 'forward'

type Props = {
  direction: Direction
}

const path: Record<Direction, string> = {
  up: 'M 16 0 L 32 16 L 0 16 L 16 0',
  down: 'M 16 16 L 0 0 L 32 0 L 16 16',
  back: 'M 0 16 L 16 0 L 16 32 L 0 16',
  forward: 'M 16 16 L 0 0 L 0 32 L 16 16',
}

export const Triangle = ({direction}: Props) => {
  const {color} = useTheme()
  const directionIsVertical = ['up', 'down'].includes(direction)
  const width = directionIsVertical ? 32 : 16
  const height = directionIsVertical ? 16 : 32
  const viewBox = directionIsVertical ? '0 0 32 16' : '0 0 16 32'

  return (
    <Center>
      <Svg {...{width, height, viewBox}} style={styles.svg}>
        <Path d={path[direction]} fill={color.background.inverse} />
      </Svg>
    </Center>
  )
}

const styles = StyleSheet.create({
  svg: {
    margin: -0.5 /* Works around visual disconnects in zoom scenarios */,
  },
})
