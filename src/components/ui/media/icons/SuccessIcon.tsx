import Svg, {SvgProps, Path} from 'react-native-svg'
import {baseColor} from '@/themes/tokens/base-color'

export const SuccessIcon = ({height = 60, width = 60}: SvgProps) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 60 60"
    width={width}>
    <Path
      clipRule="evenodd"
      d="M30.5 2.5C15.3 2.5 3 14.8 3 30C3 45.2 15.3 57.5 30.5 57.5C45.7 57.5 58 45.2 58 30C58 14.8 45.7 2.5 30.5 2.5ZM27.175 41.725L17 30.575L20.7 27.2L27.3 34.425L42.05 19.25L45.625 22.725L27.175 41.725Z"
      fill={baseColor.secondary.darkgreen}
      fillRule="evenodd"
    />
  </Svg>
)
