import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {EmptyMessage, PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {useModules} from '@/hooks'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {ModuleButton, ModulesWarning} from '@/modules/home/components'

export const Modules = () => {
  const {
    modulesError,
    modulesLoading,
    refetchModules,
    selectedModules: modules,
  } = useModules()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)

  if (modulesLoading) {
    return <PleaseWait grow />
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
      <Box>
        <EmptyMessage text="Alle modules staan uit. Daardoor is hier niet veel te doen. Zet één of meer modules aan via de instellingen rechtsboven." />
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {modules.map(({icon, isForEmployees, slug, title}) => {
          if (isForEmployees && !constructionWorkEditorId) {
            return
          }
          return (
            <ModuleButton
              iconName={icon}
              key={slug}
              label={title}
              slug={slug}
              variant={isForEmployees ? 'primary' : 'tertiary'}
            />
          )
        })}
      </Column>
    </Box>
  )
}
