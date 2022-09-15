import React, {ReactNode, SVGProps, useState} from 'react'
import {ChevronDown} from '@/assets/icons'
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

export const Accordion = ({children, title = 'Grofvuil'}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const iconProps = useThemable(createIconProps)
  return (
    <Box>
      <Column gutter="sm">
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <Row align="between" valign="center">
            <Title color="link" level="h5" text={title} />
            <Icon>
              <ChevronDown {...iconProps} />
            </Icon>
          </Row>
        </Pressable>
        {!!isOpen && children}
      </Column>
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
