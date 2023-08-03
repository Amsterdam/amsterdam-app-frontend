import {useEffect} from 'react'
import {getVersion} from 'react-native-device-info'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {useModules} from '@/hooks/useModules'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {ModuleSetting} from '@/modules/home/components/ModuleSetting'
import {ModulesWarning} from '@/modules/home/components/ModulesWarning'

export const ModuleSettings = () => {
  const {toggleableModules, modulesLoading, enabledModules} = useModules()

  const {registerDeviceWithPermission, unregisterDevice} =
    useRegisterDevice(false)

  useEffect(() => {
    if (enabledModules?.some(module => module.requiresFirebaseToken)) {
      registerDeviceWithPermission()
    } else {
      void unregisterDevice(undefined)
    }
  }, [registerDeviceWithPermission, enabledModules, unregisterDevice])

  if (modulesLoading) {
    return <PleaseWait grow />
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
      <Column gutter="sm">
        {toggleableModules.map(module => (
          <ModuleSetting
            key={module.slug}
            module={module}
          />
        ))}
      </Column>
    </Box>
  )
}
