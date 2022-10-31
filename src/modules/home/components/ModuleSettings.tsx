import React, {useEffect} from 'react'
import {getVersion} from 'react-native-device-info'
import {useDispatch, useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {useModules, useRegisterDevice, useSentry} from '@/hooks'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {ModulesWarning} from '@/modules/home/components'
import {getPushNotificationsPermission} from '@/processes'
import {toggleModule} from '@/store'
import {accessibleText} from '@/utils'

export const ModuleSettings = () => {
  const dispatch = useDispatch()
  const {modules, modulesLoading, selectedModulesBySlug, selectedModules} =
    useModules()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)

  const {sendSentryErrorLog} = useSentry()
  const {registerDevice, unregisterDevice} = useRegisterDevice()

  const onChange = (slug: string) => {
    dispatch(toggleModule(slug))
  }

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
          const {
            description,
            icon: iconName,
            isForEmployees,
            slug,
            title,
          } = module

          if (isForEmployees && !constructionWorkEditorId) {
            return
          }

          return (
            <Box distinct key={slug}>
              <Switch
                accessibilityLabel={accessibleText(title, description)}
                label={
                  <Column gutter="sm">
                    <Row gutter="sm" valign="center">
                      {/* TODO Remove fallback after updating icon name in database. */}
                      {iconName === 'projects' ? (
                        <Icon name="construction-work" size={24} />
                      ) : (
                        !!iconName && <Icon name={iconName} size={24} />
                      )}
                      <Title level="h5" text={title} />
                    </Row>
                    <Paragraph variant="small">{description}</Paragraph>
                  </Column>
                }
                onChange={() => onChange(slug)}
                value={selectedModulesBySlug.includes(slug)}
              />
            </Box>
          )
        })}
      </Column>
    </Box>
  )
}
