import React, {SVGProps} from 'react'
import {ChevronLeft, ChevronRight} from '@/assets/icons'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Link} from '@/components/ui/text'
import {IconSize} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'

type Props = {
  direction?: 'backward' | 'forward'
  iconSize?: IconSize
  label: string
  onPress: () => void
}

export const NavigationButton = ({
  direction = 'forward',
  iconSize = 24,
  label,
  onPress,
}: Props) => {
  const IconComponent = direction === 'forward' ? ChevronRight : ChevronLeft
  const iconProps = useThemable(createIconProps)

  return (
    <Pressable accessibilityRole="link" onPress={onPress}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row align="between" gutter="md" valign="center">
          {direction === 'backward' && (
            <Icon size={iconSize}>
              <IconComponent {...iconProps} />
            </Icon>
          )}
          <Link label={label} level="h5" />
          {direction === 'forward' && (
            <Icon size={iconSize}>
              <IconComponent {...iconProps} />
            </Icon>
          )}
        </Row>
      </Box>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
