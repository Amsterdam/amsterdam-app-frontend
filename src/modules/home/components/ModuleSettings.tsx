import React, {useEffect} from 'react'
import {getVersion} from 'react-native-device-info'
import {useDispatch} from 'react-redux'
import {Box, PleaseWait} from '@/components/ui'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {useRegisterDevice, useSentry} from '@/hooks'
import {useModules} from '@/hooks'
import {ModulesWarning} from '@/modules/home/components'
import {icons} from '@/modules/home/config'
import {getPushNotificationsPermission} from '@/processes'
import {useUnregisterDeviceMutation} from '@/services'
import {toggleModule} from '@/store'
import {useTheme} from '@/themes'
import {accessibleText} from '@/utils'

export const ModuleSettings = () => {
  const dispatch = useDispatch()
  const {modules, modulesLoading, selectedModulesBySlug, selectedModules} =
    useModules()
  const {color} = useTheme()

  const {sendSentryErrorLog} = useSentry()
  const {registerDevice} = useRegisterDevice()
  const [unregisterDevice] = useUnregisterDeviceMutation()

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
      // eslint-disable-next-line no-void
      void unregisterDevice(undefined)
    }
  }, [registerDevice, selectedModules, sendSentryErrorLog, unregisterDevice])

  if (modulesLoading) {
    return <PleaseWait fullSize />
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
          const {description, icon, slug, title} = module
          const ModuleIcon = icons[icon]

          return (
            <Box background="white" key={slug}>
              <Switch
                accessibilityLabel={accessibleText(title, description)}
                label={
                  <Column gutter="sm">
                    <Row gutter="sm" valign="center">
                      {!!ModuleIcon && (
                        <Icon size={24}>
                          <ModuleIcon fill={color.text.default} />
                        </Icon>
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
