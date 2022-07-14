import React from 'react'
import {Box, PleaseWait} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {ModuleButton, ModulesWarning} from '@/modules/home/components'
import {useModules} from '@/modules/home/hooks'
import {ModuleSlug} from '@/modules/slugs'

export const Modules = () => {
  const {
    modulesError,
    modulesLoading,
    refetchModules,
    selectedModules: modules,
  } = useModules()

  if (modulesLoading) {
    return <PleaseWait fullSize />
  }

  if (modulesError) {
    return (
      <ModulesWarning
        text="Er is iets misgegaan bij het ophalen van de modules."
        onRetry={refetchModules}
      />
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
        <ModuleButton
          iconName="announcement"
          key="construction-work-editor"
          label="Plaats berichten"
          slug={ModuleSlug['construction-work-editor']}
          variant="primary"
        />
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
