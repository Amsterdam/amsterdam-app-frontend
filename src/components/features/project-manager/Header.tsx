import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React from 'react'
import {color} from '../../../tokens'
import {Divider, Text, Title} from '../../ui'
import {Column, Row} from '../../ui/layout'

type Props = {
  hasProjects: boolean
}

export const ProjectManagerHeader = ({hasProjects}: Props) => {
  if (hasProjects) {
    return (
      <Column gutter="md">
        <Row gutter="sm">
          <Checkmark fill={color.status.success} height={28} width={28} />
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
        <Close fill={color.status.error} height={28} width={28} />
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
