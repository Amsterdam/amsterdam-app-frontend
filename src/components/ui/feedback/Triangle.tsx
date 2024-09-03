import {StyleSheet} from 'react-native'
import {Path, Svg} from 'react-native-svg'
import {PointerDimension} from '@/components/ui/feedback/tooltip/types'
import {Direction} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  direction: Direction
}

const {height, width} = PointerDimension

const path: Record<Direction, string> = {
  [Direction.up]: `M ${height} 0 L ${width} ${height} L 0 ${height} L ${height} 0`,
  [Direction.down]: `M ${height} ${height} L 0 0 L ${width} 0 L ${height} ${height}`,
  [Direction.left]: `M 0 ${height} L ${height} 0 L ${height} ${width} L 0 ${height}`,
  [Direction.right]: `M ${height} ${height} L 0 0 L 0 ${width} L ${height} ${height}`,
}

export const Triangle = ({direction}: Props) => {
  const iconProps = useThemable(createIconProps)
  const viewBox = [Direction.up, Direction.down].includes(direction)
    ? `0 0 ${width} ${height}`
    : `0 0 ${height} ${width}`

  return (
    <Svg
      height={height}
      style={styles.svg}
      viewBox={viewBox}
      width={width}>
      <Path
        d={path[direction]}
        {...iconProps}
      />
    </Svg>
  )
}

const createIconProps = ({color}: Theme) => ({
  fill: color.tooltip.background,
})

const styles = StyleSheet.create({
  svg: {
    margin: -0.5 /* Works around visual disconnects in zoom scenarios */,
  },
})
