import React, {ReactNode, SVGProps, useState} from 'react'
import {ChevronDown, ChevronUp} from '@/assets/icons'
import {Box} from '@/components/ui/Box'
import {Pressable} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
  title: string
}

export const Accordion = ({children, title}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const Chevron = isOpen ? ChevronUp : ChevronDown
  const iconProps = useThemable(createIconProps)

  return (
    <Column>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <Box>
          <Row align="between" gutter="sm" valign="center">
            <Title
              color="link"
              ellipsizeMode="tail"
              level="h5"
              numberOfLines={1}
              text={title}
            />
            <Icon>
              <Chevron {...iconProps} />
            </Icon>
          </Row>
        </Box>
      </Pressable>
      {!!isOpen && <Box insetHorizontal="md">{children}</Box>}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
