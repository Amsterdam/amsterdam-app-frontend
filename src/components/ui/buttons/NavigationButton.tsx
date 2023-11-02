import {TextProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {IconSize, TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLanguage?: TextProps['accessibilityLanguage']
  accessibilityRole?: 'link' | 'button'
  direction?: 'backward' | 'forward'
  iconSize?: keyof typeof IconSize
  label: string
  onPress: () => void
} & TestProps

export const NavigationButton = ({
  direction = 'forward',
  iconSize = 'lg',
  label,
  onPress,
  testID,
  accessibilityRole = 'link',
  accessibilityLanguage = 'nl-NL',
}: Props) => (
  <Pressable
    accessibilityLanguage={accessibilityLanguage}
    accessibilityRole={accessibilityRole}
    onPress={onPress}
    testID={testID}>
    <Box
      insetHorizontal="md"
      insetVertical="sm">
      <Row
        align="between"
        gutter="md"
        valign="center">
        {direction === 'backward' && (
          <Icon
            color="link"
            name="chevron-left"
            size={iconSize}
          />
        )}
        <Title
          color="link"
          level="h5"
          text={label}
        />
        {direction === 'forward' && (
          <Icon
            color="link"
            name="chevron-right"
            size={iconSize}
          />
        )}
      </Row>
    </Box>
  </Pressable>
)
