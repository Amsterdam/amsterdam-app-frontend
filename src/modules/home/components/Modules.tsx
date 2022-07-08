import React from 'react'
import {Attention, Box, PleaseWait} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Paragraph, Phrase} from '@/components/ui/text'
import {ModuleButton} from '@/modules/home/components'
import {useModules} from '@/modules/home/hooks'

export const Modules = () => {
  const {getSelectedModules, isLoadingModules} = useModules()
  const modules = getSelectedModules()

  if (isLoadingModules) {
    return <PleaseWait />
  }

  if (!modules) {
    return (
      <Box insetHorizontal="md" insetVertical="xxxl">
        <Attention warning>
          <Phrase fontWeight="bold">Fout</Phrase>
          <Paragraph variant="small">Modules worden niet geladen.</Paragraph>
        </Attention>
      </Box>
    )
  }

  if (!modules.length) {
    return (
      <Box insetHorizontal="md" insetVertical="xxxl">
        <EmptyMessage
          text="Alle modules staan uit. Daardoor is hier niet veel te doen.
          Zet één of meer modules aan via de instellingen rechtsboven."
        />
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {modules.map(({icon, slug, title}) => (
          <ModuleButton iconName={icon} key={slug} label={title} slug={slug} />
        ))}
      </Column>
    </Box>
  )
}
