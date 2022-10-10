import React, {ReactNode, SVGProps, useState} from 'react'
import {ChevronDown, ChevronUp} from '@/assets/icons'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers/Box'
import {Column, Gutter, Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {Theme, useThemable, useTheme} from '@/themes'

type AccordionProps = {
  children: ReactNode
  title: string
}

type PanelProps = {
  isOpen: boolean
} & Pick<AccordionProps, 'children'>

const Panel = ({children, isOpen}: PanelProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <Box insetHorizontal="md">{children}</Box>
      <Gutter height="md" />
    </>
  )
}

export const Accordion = ({children, title}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const Chevron = isOpen ? ChevronUp : ChevronDown
  const iconProps = useThemable(createIconProps)
  const {text} = useTheme()

  return (
    <Column>
      <Pressable
        accessibilityHint={`Dubbeltik om de inhoud te ${
          isOpen ? 'verbergen' : 'bekijken'
        }`}
        onPress={() => setIsOpen(!isOpen)}>
        <Box>
          <Row align="between" gutter="md" valign="start">
            <Title
              color="link"
              ellipsizeMode="tail"
              level="h5"
              numberOfLines={3}
              text={title}
            />
            <Size height={text.fontSize.h5 * text.lineHeight.h5}>
              <Icon size={24}>
                <Chevron {...iconProps} />
              </Icon>
            </Size>
          </Row>
        </Box>
      </Pressable>
      <Panel {...{children, isOpen}} />
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
