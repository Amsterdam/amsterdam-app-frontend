import {pascalCase} from 'pascal-case'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {EmptyMessage, PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {useModules} from '@/hooks'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {ModuleButton, ModulesWarning} from '@/modules/home/components'
import {ModuleStatus} from '@/modules/types'

export const Modules = () => {
  const {
    modulesError,
    modulesLoading,
    refetchModules,
    selectedModules: modules,
  } = useModules()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const isEmployee = !!constructionWorkEditorId

  if (modulesLoading) {
    return <PleaseWait grow />
  }

  if (modulesError) {
    return (
      <ModulesWarning
        onRetry={refetchModules}
        text="Er is iets misgegaan bij het ophalen van de modules."
      />
    )
  }

  const availableModules = modules.filter(
    m => (!m.isForEmployees || isEmployee) && !m.hiddenInMenu,
  )

  if (!availableModules.length) {
    return (
      <Box>
        <EmptyMessage text="Alle modules staan uit. Daardoor is hier niet veel te doen. Zet één of meer modules aan via de instellingen rechtsboven." />
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {availableModules.map(
          ({BadgeValue, icon, isForEmployees, slug, status, title}) => (
            <ModuleButton
              BadgeValue={BadgeValue}
              disabled={status === ModuleStatus.inactive}
              iconName={icon}
              key={slug}
              label={title}
              slug={slug}
              testID={['Home', pascalCase(slug), 'ModuleButton'].join('')}
              variant={isForEmployees ? 'primary' : 'tertiary'}
            />
          ),
        )}
      </Column>
    </Box>
  )
}
