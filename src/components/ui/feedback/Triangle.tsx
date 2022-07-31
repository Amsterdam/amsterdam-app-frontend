import React from 'react'
import {StyleSheet} from 'react-native'
import {Path, Svg} from 'react-native-svg'
import {Center} from '@/components/ui/layout'
import {Direction} from '@/components/ui/types'
import {useTheme} from '@/themes'

type Props = {
  direction: Direction
}

const path: Record<Direction, string> = {
  [Direction.up]: 'M 16 0 L 32 16 L 0 16 L 16 0',
  [Direction.down]: 'M 16 16 L 0 0 L 32 0 L 16 16',
  [Direction.left]: 'M 0 16 L 16 0 L 16 32 L 0 16',
  [Direction.right]: 'M 16 16 L 0 0 L 0 32 L 16 16',
}

export const Triangle = ({direction}: Props) => {
  const {color} = useTheme()
  const [width, height, viewBox] = [Direction.up, Direction.down].includes(
    direction,
  )
    ? [32, 16, '0 0 32 16']
    : [16, 32, '0 0 16 32']

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
