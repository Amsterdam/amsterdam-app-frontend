import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg'

export const TimeDurationSpinnerDirectionArrowFigure = () => (
  <Svg
    fill="none"
    height={160}
    viewBox="0 0 160 160"
    width={160}>
    <G clipPath="url(#clip0_4356_5678)">
      <Path
        d="M143.86 78.5C143.86 42.8776 114.982 14 79.3599 14V9C117.744 9 148.86 40.1162 148.86 78.5C148.86 116.884 117.744 148 79.3599 148V143C114.982 143 143.86 114.122 143.86 78.5Z"
        fill="url(#paint0_linear_4356_5678)"
      />
      <Path
        d="M69 145.86L84.5412 136.888L84.5412 154.833L69 145.86Z"
        fill="#00A03C"
      />
    </G>
    <Defs>
      <LinearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_4356_5678"
        x1="81.0001"
        x2="79.3599"
        y1="43.5"
        y2="138">
        <Stop
          stopColor="#00A03C"
          stopOpacity={0}
        />
        <Stop
          offset={1}
          stopColor="#00A03C"
        />
      </LinearGradient>
      <ClipPath id="clip0_4356_5678">
        <Rect
          fill="white"
          height={160}
          width={160}
        />
      </ClipPath>
    </Defs>
  </Svg>
)
