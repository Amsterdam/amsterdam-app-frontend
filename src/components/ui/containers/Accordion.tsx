import React, {ReactNode, useState} from 'react'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers/Box'
import {Column, Gutter, Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {useTheme} from '@/themes'

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
  const iconName = isOpen ? 'chevron-up' : 'chevron-down'
  const {text} = useTheme()

  return (
    <Column>
      <Pressable
        accessibilityHint={`${title}, Dubbeltik om de inhoud te ${
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
              weight="extraBold"
            />
            <Size height={text.fontSize.h5 * text.lineHeight.h5}>
              <Icon color="link" name={iconName} size={24} />
            </Size>
          </Row>
        </Box>
      </Pressable>
      <Panel {...{children, isOpen}} />
    </Column>
  )
}
