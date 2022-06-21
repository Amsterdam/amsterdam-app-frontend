import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React from 'react'
import {useSelector} from 'react-redux'
import {Divider, Text, Title} from '@/components/ui'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {selectTheme} from '@/themes'

type Props = {
  hasProjects: boolean
}

export const ProjectManagerHeader = ({hasProjects}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)

  if (hasProjects) {
    return (
      <Column gutter="md">
        <Row gutter="sm">
          <Icon size={24}>
            <Checkmark fill={color.severity.positive} />
          </Icon>
          <Title text="Gelukt!" />
        </Row>
        <Text intro>
          Je kunt voor de volgende projecten een pushbericht versturen vanaf de
          projectpagina:
        </Text>
        <Divider />
      </Column>
    )
  }

  return (
    <Column gutter="md">
      <Row gutter="sm">
        <Icon size={24}>
          <Close fill={color.severity.negative} />
        </Icon>
        <Title text="Er gaat iets mis…" />
      </Row>
      <Text intro>
        Helaas lukt het niet om de projecten te laden waarvoor je pushberichten
        mag versturen. Probeer de app nogmaals te openen met de toegestuurde
        link.
      </Text>
      <Text>Lukt dit niet? Neem dan contact op met de redactie.</Text>
    </Column>
  )
}
