import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg'
export const BluetoothIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    height={60}
    width={60}
    {...props}>
    <G
      clipPath="url(#a)"
      clipRule="evenodd"
      fill="#000"
      fillRule="evenodd">
      <Path d="M30.5 56c14.36 0 26-11.64 26-26S44.86 4 30.5 4s-26 11.64-26 26 11.64 26 26 26Zm0 4c16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30C13.931 0 .5 13.431.5 30c0 16.569 13.431 30 30 30Z" />
      <Path d="M28.625 9.713 41.668 22.03 33.231 30l8.437 7.969-13.043 12.318V34.35l-5.275 4.982-2.575-2.726L27.77 30l-6.994-6.606 2.575-2.726 5.275 4.982V9.713Zm3.75 24.637 3.832 3.619-3.832 3.619V34.35Zm0-8.7v-7.238l3.832 3.62-3.832 3.618Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          d="M.5 0h60v60H.5z"
          fill="#fff"
        />
      </ClipPath>
    </Defs>
  </Svg>
)
