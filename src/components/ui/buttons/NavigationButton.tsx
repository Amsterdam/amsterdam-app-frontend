import React from 'react'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {IconSize} from '@/components/ui/types'

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
}: Props) => (
  <Pressable accessibilityRole="link" onPress={onPress}>
    <Box insetHorizontal="md" insetVertical="sm">
      <Row align="between" gutter="md" valign="center">
        {direction === 'backward' && (
          <Icon color="link" name="chevron-left" size={iconSize} />
        )}
        <Title color="link" level="h5" text={label} />
        {direction === 'forward' && (
          <Icon color="link" name="chevron-right" size={iconSize} />
        )}
      </Row>
    </Box>
  </Pressable>
)
