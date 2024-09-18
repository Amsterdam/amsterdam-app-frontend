import {Svg, Circle, SvgProps} from 'react-native-svg'

export const MeatballsMenu = ({
  color,
  width = 30,
  height = 30,
  ...props
}: SvgProps) => (
  <Svg
    {...props}
    fill="none"
    height={height}
    viewBox="0 0 28 28"
    width={width}>
    <Circle
      cx="14"
      cy="14"
      r="13"
      stroke={color}
      stroke-width="2"
    />
    <Circle
      cx="14"
      cy="14"
      fill={color}
      r="2"
    />
    <Circle
      cx="8"
      cy="14"
      fill={color}
      r="2"
    />
    <Circle
      cx="20"
      cy="14"
      fill={color}
      r="2"
    />
  </Svg>
)
