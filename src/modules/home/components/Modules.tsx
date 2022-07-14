import React from 'react'
import {Box, PleaseWait} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {ModuleButton} from '@/modules/home/components'
import {useModules} from '@/modules/home/hooks'

export const Modules = () => {
  const {selectedModules: modules, isLoadingModules} = useModules()

  if (isLoadingModules) {
    return <PleaseWait fullSize />
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
        {modules.map(({icon, isForEmployees, slug, title}) => (
          <ModuleButton
            iconName={icon}
            key={slug}
            label={title}
            slug={slug}
            variant={isForEmployees ? 'primary' : 'tertiary'}
          />
        ))}
      </Column>
    </Box>
  )
}
