import {useEffect} from 'react'
import {getVersion} from 'react-native-device-info'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {useModules, useRegisterDevice, useSentry} from '@/hooks'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {ModuleSetting, ModulesWarning} from '@/modules/home/components'
import {getPushNotificationsPermission} from '@/processes'

export const ModuleSettings = () => {
  const {modules, modulesLoading, selectedModules} = useModules()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)

  const {sendSentryErrorLog} = useSentry()
  const {registerDevice, unregisterDevice} = useRegisterDevice()

  useEffect(() => {
    if (selectedModules.some(module => module.requiresFirebaseToken)) {
      getPushNotificationsPermission()
        .then(registerDevice)
        .catch((error: unknown) => {
          sendSentryErrorLog(
            'Register device for push notifications failed',
            'ModuleSettings.tsx',
            {error},
          )
        })
    } else {
      void unregisterDevice(undefined)
    }
  }, [registerDevice, selectedModules, sendSentryErrorLog, unregisterDevice])

  if (modulesLoading) {
    return <PleaseWait grow />
  }

  if (!modules.length) {
    return (
      <ModulesWarning
        text={`We hebben geen modules gevonden voor versie ${getVersion()} van de app.`}
      />
    )
  }

  return (
    <Box>
      <Column gutter="sm">
        {modules.map(module => {
          if (module.requiresAuthorization && !constructionWorkEditorId) {
            return
          }

          return <ModuleSetting key={module.slug} module={module} />
        })}
      </Column>
    </Box>
  )
}
