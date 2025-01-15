import Svg, {SvgProps, Path} from 'react-native-svg'
import {baseColor} from '@/themes/tokens/base-color'

export const FailedIcon = ({height = 60, width = 60}: SvgProps) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 60 60"
    width={width}>
    <Path
      clip-rule="evenodd"
      d="M3 30C3 14.8 15.3 2.5 30.5 2.5C45.7 2.5 58 14.8 58 30C58 45.2 45.7 57.5 30.5 57.5C15.3 57.5 3 45.2 3 30ZM40.8497 17.2751L44.2747 20.9001L34.2747 30.3501L44.2747 39.7751L40.8497 43.4001L30.6497 33.7751L20.4497 43.4001L17.0247 39.7751L26.9997 30.3501L17.0247 20.9001L20.4497 17.2751L30.6497 26.9001L40.8497 17.2751Z"
      fill={baseColor.primary.red}
      fill-rule="evenodd"
    />
  </Svg>
)
