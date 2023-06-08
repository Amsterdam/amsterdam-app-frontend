import {pascalCase} from 'pascal-case'
import {Box} from '@/components/ui/containers'
import {EmptyMessage, PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {useModules} from '@/hooks'
import {ModuleButton, ModulesWarning} from '@/modules/home/components'
import {ModuleStatus} from '@/modules/types'

export const Modules = () => {
  const {
    authorizedModules,
    modulesError,
    modulesLoading,
    refetchModules,
    selectedModules: modules,
  } = useModules()

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
    m => !m.hiddenInMenu && authorizedModules.includes(m),
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
          ({BadgeValue, icon, requiresAuthorization, slug, status, title}) => (
            <ModuleButton
              BadgeValue={BadgeValue}
              disabled={status === ModuleStatus.inactive}
              iconName={icon}
              key={slug}
              label={title}
              slug={slug}
              testID={`Home${pascalCase(slug)}ModuleButton`}
              variant={requiresAuthorization ? 'primary' : 'tertiary'}
            />
          ),
        )}
      </Column>
    </Box>
  )
}
