import React from 'react'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {IconSize, TestID} from '@/components/ui/types'

type Props = {
  direction?: 'backward' | 'forward'
  iconSize?: keyof typeof IconSize
  label: string
  onPress: () => void
  testID?: TestID
}

export const NavigationButton = ({
  direction = 'forward',
  iconSize = 'lg',
  label,
  onPress,
  testID,
}: Props) => (
  <Pressable accessibilityRole="link" {...{onPress, testID}}>
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
