import {Svg, Path, SvgProps} from 'react-native-svg'

export const MeatballsMenu = ({
  color,
  width = 28,
  height = 28,
  ...props
}: SvgProps) => (
  <Svg
    {...props}
    fill="none"
    height={height}
    viewBox="0 0 28 28"
    width={width}>
    <Path
      clip-rule="evenodd"
      d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2ZM0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z"
      fill={color}
      fill-rule="evenodd"
    />
    <Path
      d="M16 14C16 15.1046 15.1046 16 14 16C12.8954 16 12 15.1046 12 14C12 12.8954 12.8954 12 14 12C15.1046 12 16 12.8954 16 14Z"
      fill={color}
    />
    <Path
      d="M10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14Z"
      fill={color}
    />
    <Path
      d="M22 14C22 15.1046 21.1046 16 20 16C18.8954 16 18 15.1046 18 14C18 12.8954 18.8954 12 20 12C21.1046 12 22 12.8954 22 14Z"
      fill={color}
    />
  </Svg>
)
