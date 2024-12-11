import {Svg, Circle, Path} from 'react-native-svg'
import {useTheme} from '@/themes/useTheme'

export const AvatarAgent = () => {
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
        clip-rule="evenodd"
        d="M20 35C13.5 35 9 30.5 9 30.1981C9 24.5731 12.15 21.625 16.5 21.625H24C28.35 21.625 31.5 24.0062 31.5 29.6312C31.5 30.1981 26.5 35 20 35ZM20.25 19.75C23.3397 19.7096 25.8346 17.2147 25.875 14.125C25.875 11.0184 23.3566 8.5 20.25 8.5C17.1434 8.5 14.625 11.0184 14.625 14.125C14.6654 17.2147 17.1603 19.7096 20.25 19.75Z"
        fill={color.chat.avatar.foreground}
        fill-rule="evenodd"
      />
    </Svg>
  )
}
