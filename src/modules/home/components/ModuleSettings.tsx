import {useEffect} from 'react'
import {getVersion} from 'react-native-device-info'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {useModules, useRegisterDevice} from '@/hooks'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {ModuleSetting, ModulesWarning} from '@/modules/home/components'

export const ModuleSettings = () => {
  const {modules, modulesLoading, selectedModules} = useModules()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)

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
