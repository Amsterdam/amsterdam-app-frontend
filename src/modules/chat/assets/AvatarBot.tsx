import {Svg, Circle, Path} from 'react-native-svg'
import {useTheme} from '@/themes/useTheme'

export const AvatarBot = () => {
  const {color} = useTheme()

  return (
    <Svg
      fill="none"
      height="40"
      viewBox="0 0 40 40"
      width="40">
      <Circle
        cx="20"
        cy="20"
        fill={color.chat.avatar.background}
        r="19.5"
        stroke={color.chat.avatar.border}
      />
      <Path
        d="M16.3604 30.9196L18.5404 28.7396L16.3604 26.5396L17.8204 25.0996L20.0004 27.2796L22.1804 25.0996L23.6404 26.5396L21.4604 28.7396L23.6404 30.9196L22.1804 32.3596L20.0004 30.1796L17.8204 32.3596L16.3604 30.9196Z"
        fill={color.logo}
      />
      <Path
        d="M16.3604 22.1799L18.5404 19.9999L16.3604 17.8199L17.8204 16.3799L20.0004 18.5599L22.1804 16.3799L23.6404 17.8199L21.4604 19.9999L23.6404 22.1799L22.1804 23.6399L20.0004 21.4599L17.8204 23.6399L16.3604 22.1799Z"
        fill={color.logo}
      />
      <Path
        d="M16.3604 13.4596L18.5404 11.2596L16.3604 9.07965L17.8204 7.63965L20.0004 9.81965L22.1804 7.63965L23.6404 9.07965L21.4604 11.2596L23.6404 13.4596L22.1804 14.8996L20.0004 12.7196L17.8204 14.8996L16.3604 13.4596Z"
        fill={color.logo}
      />
    </Svg>
  )
}
