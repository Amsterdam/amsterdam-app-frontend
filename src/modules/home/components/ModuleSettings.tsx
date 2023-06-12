import {useEffect} from 'react'
import {getVersion} from 'react-native-device-info'
import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {useModules, useRegisterDevice} from '@/hooks'
import {ModuleSetting, ModulesWarning} from '@/modules/home/components'

export const ModuleSettings = () => {
  const {authorizedModules, modulesLoading, selectedModules} = useModules()

  const {registerDeviceWithPermission, unregisterDevice} = useRegisterDevice()

  useEffect(() => {
    if (selectedModules.some(module => module.requiresFirebaseToken)) {
      registerDeviceWithPermission()
    } else {
      void unregisterDevice(undefined)
    }
  }, [registerDeviceWithPermission, selectedModules, unregisterDevice])

  if (modulesLoading) {
    return <PleaseWait grow />
  }

  if (!authorizedModules.length) {
    return (
      <ModulesWarning
        text={`We hebben geen modules gevonden voor versie ${getVersion()} van de app.`}
      />
    )
  }

  return (
    <Box>
      <Column gutter="sm">
        {authorizedModules.map(module => (
          <ModuleSetting key={module.slug} module={module} />
        ))}
      </Column>
    </Box>
  )
}
