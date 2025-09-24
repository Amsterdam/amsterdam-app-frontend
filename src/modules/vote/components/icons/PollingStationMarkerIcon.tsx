import * as React from 'react'
import Svg, {
  G,
  Path,
  Ellipse,
  Rect,
  Circle,
  Defs,
  ClipPath,
} from 'react-native-svg'

export const PollingStationMarkerIcon = (
  props: React.ComponentProps<typeof Svg>,
) => (
  <Svg
    fill="none"
    height={40}
    viewBox="0 0 40 40"
    width={40}
    {...props}>
    <Defs>
      <ClipPath id="clip0_9596_2164">
        <Rect
          fill="white"
          height={40}
          width={40}
        />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_9596_2164)">
      {/* Drop shadow filter is not supported in react-native-svg, so it's omitted */}
      <Path
        clipRule="evenodd"
        d="M3.33334 20C3.33334 28.1482 14.4445 35.6173 20 38.3333C25.5556 35.6173 36.6667 28.1482 36.6667 20C31.25 20 14.4445 20 3.33334 20Z"
        fill="white"
        fillRule="evenodd"
      />
      <Ellipse
        cx={20}
        cy={18.3334}
        fill="white"
        rx={16.6667}
        ry={16.6667}
      />
      <Rect
        fill="white"
        height={20}
        width={20}
        x={10}
        y={8.33331}
      />
      <Circle
        cx={20}
        cy={18.3333}
        fill="#181818"
        r={8.33333}
      />
    </G>
  </Svg>
)
