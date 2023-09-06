import {pascalCase} from 'pascal-case'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {useModules} from '@/hooks/useModules'
import {ModuleButton} from '@/modules/home/components/ModuleButton'
import {ModulesWarning} from '@/modules/home/components/ModulesWarning'
import {ModuleStatus} from '@/modules/types'

export const Modules = () => {
  const {enabledModules, modulesError, modulesLoading, refetchModules} =
    useModules()

  if (modulesLoading) {
    return <PleaseWait grow />
  }

  if (modulesError || !enabledModules) {
    return (
      <ModulesWarning
        onRetry={refetchModules}
        text="Er is iets misgegaan bij het ophalen van de modules."
      />
    )
  }

  const availableModules = enabledModules?.filter(m => !m.hiddenInMenu)

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
        {availableModules?.map(
          ({
            alwaysEnabled,
            BadgeValue,
            icon,
            requiresAuthorization,
            slug,
            status,
            title,
          }) => (
            <ModuleButton
              alwaysEnabled={alwaysEnabled}
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
