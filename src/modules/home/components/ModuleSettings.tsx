import {pascalCase} from 'pascal-case'
import {getVersion} from 'react-native-device-info'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useModules} from '@/hooks/useModules'
import {ModuleSetting} from '@/modules/home/components/ModuleSetting'
import {ModulesWarning} from '@/modules/home/components/ModulesWarning'

export const ModuleSettings = () => {
  const {toggleableModules, modulesLoading} = useModules()

  if (modulesLoading) {
    return (
      <PleaseWait
        grow
        testID="HomeModulesLoadingSpinner"
      />
    )
  }

  if (!toggleableModules || toggleableModules.length === 0) {
    return (
      <ModulesWarning
        text={`We hebben geen modules gevonden voor versie ${getVersion()} van de app.`}
      />
    )
  }

  return (
    <Box>
      <Column gutter="md">
        <Paragraph>
          Hier kunt u zelf bepalen welke onderwerpen u wilt zien in de app.
        </Paragraph>
        <Column gutter="sm">
          {toggleableModules.map(module => (
            <ModuleSetting
              key={module.slug}
              module={module}
              testID={`HomeModule${pascalCase(module.slug)}`}
            />
          ))}
        </Column>
      </Column>
    </Box>
  )
}
